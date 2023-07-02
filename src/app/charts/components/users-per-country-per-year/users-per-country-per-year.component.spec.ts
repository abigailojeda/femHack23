import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USersPerCountryPerYearComponent } from './users-per-country-per-year.component';

describe('USersPerCountryPerYearComponent', () => {
  let component: USersPerCountryPerYearComponent;
  let fixture: ComponentFixture<USersPerCountryPerYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ USersPerCountryPerYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(USersPerCountryPerYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
