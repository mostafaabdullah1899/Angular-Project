import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbymodelComponent } from './carbymodel.component';

describe('CarbymodelComponent', () => {
  let component: CarbymodelComponent;
  let fixture: ComponentFixture<CarbymodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbymodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbymodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
