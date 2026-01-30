import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogDesktopComponent } from './catalog-desktop.component';

describe('CatalogDesktopComponent', () => {
  let component: CatalogDesktopComponent;
  let fixture: ComponentFixture<CatalogDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogDesktopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
