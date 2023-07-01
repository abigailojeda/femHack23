import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPerYearChartComponent } from './users-per-year-chart.component';

describe('UsersPerYearChartComponent', () => {
  let component: UsersPerYearChartComponent;
  let fixture: ComponentFixture<UsersPerYearChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPerYearChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersPerYearChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
