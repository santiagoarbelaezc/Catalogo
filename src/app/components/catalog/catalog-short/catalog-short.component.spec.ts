import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogShortComponent } from './catalog-short.component';

describe('CatalogShortComponent', () => {
  let component: CatalogShortComponent;
  let fixture: ComponentFixture<CatalogShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogShortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
