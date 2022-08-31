import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbybrandComponent } from './carbybrand.component';

describe('CarbybrandComponent', () => {
  let component: CarbybrandComponent;
  let fixture: ComponentFixture<CarbybrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbybrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbybrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
