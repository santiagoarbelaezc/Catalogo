import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistricolComponent } from './districol.component';

describe('DistricolComponent', () => {
  let component: DistricolComponent;
  let fixture: ComponentFixture<DistricolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistricolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistricolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
