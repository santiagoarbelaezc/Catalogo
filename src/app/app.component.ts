import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastContainerComponent } from './components/shared/toast-container/toast-container.component';
import { ProductDetailComponent } from './components/catalog/product-detail/product-detail.component';
import { ProductDetailService } from './services/product-detail.service';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToastContainerComponent, ProductDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Catalogo';

  constructor(public detailService: ProductDetailService) {}

  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }
}
