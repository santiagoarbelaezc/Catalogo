import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaxtilineasComponent } from './plaxtilineas.component';

describe('PlaxtilineasComponent', () => {
  let component: PlaxtilineasComponent;
  let fixture: ComponentFixture<PlaxtilineasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaxtilineasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaxtilineasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
