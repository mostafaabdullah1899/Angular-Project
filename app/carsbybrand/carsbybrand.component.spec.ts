import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsbybrandComponent } from './carsbybrand.component';

describe('CarsbybrandComponent', () => {
  let component: CarsbybrandComponent;
  let fixture: ComponentFixture<CarsbybrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsbybrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsbybrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
