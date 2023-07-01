import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { UsersPerYearChartComponent } from './pages/users-per-year-chart/users-per-year-chart.component';



@NgModule({
  declarations: [
    HomeComponent,
    UsersPerYearChartComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule
  ]
})
export class ChartsModule { }
