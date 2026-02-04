import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoPrintComponent } from './catalogo-print.component';

describe('CatalogoPrintComponent', () => {
  let component: CatalogoPrintComponent;
  let fixture: ComponentFixture<CatalogoPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoPrintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
