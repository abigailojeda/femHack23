import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesRankingComponent } from './countries-ranking.component';

describe('CountriesRankingComponent', () => {
  let component: CountriesRankingComponent;
  let fixture: ComponentFixture<CountriesRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesRankingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
