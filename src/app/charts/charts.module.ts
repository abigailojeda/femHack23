import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { UsersPerYearComponent } from './components/users-per-year/users-per-year.component';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { USersPerCountryPerYearComponent } from './components/users-per-country-per-year/users-per-country-per-year.component';
import { FormsModule } from '@angular/forms';
import { CountriesRankingComponent } from './components/countries-ranking/countries-ranking.component';
import { UsersMapComponent } from './components/users-map/users-map.component';
@NgModule({
  declarations: [
    HomeComponent, 
    UsersPerYearComponent, USersPerCountryPerYearComponent, CountriesRankingComponent, UsersMapComponent
  ],

  imports: [
    CommonModule,
    ChartsRoutingModule,
    HttpClientModule,
    NgApexchartsModule,
    FormsModule,
    
  ],
})
export class ChartsModule {}
