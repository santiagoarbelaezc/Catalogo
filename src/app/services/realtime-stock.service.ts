import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

export interface StockUpdateEvent {
  productId: number;
  newStock: number;
  source: string;
  createdAt: string;
}

interface InventoryChangesResponse {
  success: boolean;
  data: {
    enabled: boolean;
    reset: boolean;
    last_id: number;
    events: Array<{
      id: number;
      producto_id: number;
      stock_nuevo: number;
      origen: string;
      creado_at: string;
    }>;
    has_more: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class RealtimeStockService implements OnDestroy {
  private stockUpdateSubject = new Subject<StockUpdateEvent>();
  public stockUpdate$: Observable<StockUpdateEvent> = this.stockUpdateSubject.asObservable();

  private eventSource: EventSource | null = null;
  private pollIntervalId: any = null;
  private lastSeenEventId: number = 0;
  private isConnecting = false;
  private sseFailedCount = 0;
  private usePollingFallback = false;
  private visibilityHandler: (() => void) | null = null;
  private activeSubscribersCount = 0;

  constructor(
    private http: HttpClient,
    private zone: NgZone
  ) {
    this.setupVisibilityListener();
  }

  /**
   * Conecta al canal en tiempo real (SSE con fallback a sondeo adaptativo).
   * Es idempotente: solo mantiene 1 flujo activo.
   */
  public connect(): void {
    this.activeSubscribersCount++;
    if (this.eventSource || this.pollIntervalId || this.isConnecting) {
      return;
    }

    if (this.usePollingFallback || typeof EventSource === 'undefined') {
      this.startAdaptivePolling();
    } else {
      this.startSseConnection();
    }
  }

  /**
   * Desconecta o decrementa escuchas activas.
   */
  public disconnect(): void {
    this.activeSubscribersCount = Math.max(0, this.activeSubscribersCount - 1);
    if (this.activeSubscribersCount === 0) {
      this.closeAllConnections();
    }
  }

  private startSseConnection(): void {
    this.closeAllConnections();
    this.isConnecting = true;

    const streamUrl = `${environment.apiUrl}/inventario/stream${this.lastSeenEventId > 0 ? '?last_id=' + this.lastSeenEventId : ''}`;

    try {
      this.eventSource = new EventSource(streamUrl);

      this.eventSource.addEventListener('stock_update', (event: MessageEvent) => {
        this.zone.run(() => {
          try {
            const parsed = JSON.parse(event.data);
            if (parsed && parsed.producto_id !== undefined) {
              const stockEvent: StockUpdateEvent = {
                productId: Number(parsed.producto_id),
                newStock: Number(parsed.stock_nuevo),
                source: parsed.origen || 'ecommerce',
                createdAt: parsed.creado_at || new Date().toISOString()
              };

              if (parsed.id) {
                this.lastSeenEventId = Math.max(this.lastSeenEventId, Number(parsed.id));
              }

              this.stockUpdateSubject.next(stockEvent);
            }
          } catch (e) {
            console.warn('[RealtimeStock] Error procesando evento SSE:', e);
          }
        });
      });

      this.eventSource.addEventListener('connected', (event: MessageEvent) => {
        this.isConnecting = false;
        this.sseFailedCount = 0;
        try {
          const parsed = JSON.parse(event.data);
          if (parsed?.last_id) {
            this.lastSeenEventId = Math.max(this.lastSeenEventId, Number(parsed.last_id));
          }
        } catch (_) {}
      });

      this.eventSource.onerror = () => {
        this.isConnecting = false;
        this.sseFailedCount++;
        // Si SSE falla repetidamente (ej. hosting cierra streams o proxies), activar polling fallback
        if (this.sseFailedCount >= 2) {
          console.info('[RealtimeStock] SSE interrumpido por hosting; activando modo sondeo liviano');
          this.usePollingFallback = true;
          this.closeSse();
          this.startAdaptivePolling();
        }
      };
    } catch (e) {
      this.isConnecting = false;
      this.usePollingFallback = true;
      this.startAdaptivePolling();
    }
  }

  private startAdaptivePolling(): void {
    this.closeAllConnections();

    // Consulta inicial inmediata
    this.fetchChanges();

    // Intervalo liviano cada 4 segundos (solo si pestaña visible)
    this.pollIntervalId = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) {
        return;
      }
      this.fetchChanges();
    }, 4000);
  }

  private fetchChanges(): void {
    const headers = new HttpHeaders({
      'X-Skip-Error-Toast': 'true',
      'Cache-Control': 'no-cache'
    });

    const url = `${environment.apiUrl}/inventario/cambios?since_id=${this.lastSeenEventId}`;

    this.http.get<InventoryChangesResponse>(url, { headers }).subscribe({
      next: (res) => {
        if (!res?.success || !res?.data?.enabled) {
          return;
        }

        const data = res.data;
        if (data.reset) {
          this.lastSeenEventId = data.last_id || 0;
          return;
        }

        if (Array.isArray(data.events) && data.events.length > 0) {
          data.events.forEach(ev => {
            this.stockUpdateSubject.next({
              productId: Number(ev.producto_id),
              newStock: Number(ev.stock_nuevo),
              source: ev.origen || 'ecommerce',
              createdAt: ev.creado_at
            });
            this.lastSeenEventId = Math.max(this.lastSeenEventId, Number(ev.id));
          });
        } else if (data.last_id) {
          this.lastSeenEventId = Math.max(this.lastSeenEventId, Number(data.last_id));
        }
      },
      error: () => {
        // Silencioso: no interrumpe la navegación ni alerta al usuario
      }
    });
  }

  private setupVisibilityListener(): void {
    if (typeof document === 'undefined') return;

    this.visibilityHandler = () => {
      if (document.hidden) {
        // En segundo plano: pausar para ahorrar batería y sockets de hosting
        this.closeAllConnections();
      } else {
        // En primer plano: reconectar de inmediato
        if (this.activeSubscribersCount > 0) {
          this.connect();
        }
      }
    };

    document.addEventListener('visibilitychange', this.visibilityHandler);
  }

  private closeSse(): void {
    if (this.eventSource) {
      try {
        this.eventSource.close();
      } catch (_) {}
      this.eventSource = null;
    }
  }

  private closeAllConnections(): void {
    this.closeSse();
    if (this.pollIntervalId) {
      clearInterval(this.pollIntervalId);
      this.pollIntervalId = null;
    }
    this.isConnecting = false;
  }

  ngOnDestroy(): void {
    this.closeAllConnections();
    if (this.visibilityHandler && typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
    }
    this.stockUpdateSubject.complete();
  }
}
