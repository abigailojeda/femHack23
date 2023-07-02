import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPerYearComponent } from './users-per-year.component';

describe('UsersPerYearComponent', () => {
  let component: UsersPerYearComponent;
  let fixture: ComponentFixture<UsersPerYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPerYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersPerYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
