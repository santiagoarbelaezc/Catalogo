import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspumasplasticosComponent } from './espumasplasticos.component';

describe('EspumasplasticosComponent', () => {
  let component: EspumasplasticosComponent;
  let fixture: ComponentFixture<EspumasplasticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspumasplasticosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspumasplasticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
