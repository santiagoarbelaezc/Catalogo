import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrioProductsComponent } from './trio-products.component';

describe('TrioProductsComponent', () => {
  let component: TrioProductsComponent;
  let fixture: ComponentFixture<TrioProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrioProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrioProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
