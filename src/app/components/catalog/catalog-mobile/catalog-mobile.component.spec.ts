import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogMobileComponent } from './catalog-mobile.component';

describe('CatalogMobileComponent', () => {
  let component: CatalogMobileComponent;
  let fixture: ComponentFixture<CatalogMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
