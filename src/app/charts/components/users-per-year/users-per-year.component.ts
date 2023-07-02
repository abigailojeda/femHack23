import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartsService } from '../../services/charts.service';
import { ApexDataLabels } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-users-per-year',
  templateUrl: './users-per-year.component.html',
  styleUrls: ['./users-per-year.component.scss'],
})
export class UsersPerYearComponent implements OnInit {
  years: number[] = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
  ];
  userData: any[] = [];
  public chartSeries: ApexAxisChartSeries;
  public chartXAxis: ApexXAxis;
  public plotOptions!: ApexPlotOptions;
  public chart!: ApexChart;
  dataLabels: ApexDataLabels = {
    enabled: false,
  };

  constructor(private chartsService: ChartsService) {
    this.chartXAxis = {
      categories: [],
    };

    this.chartSeries = [
      {
        name: 'Users',
        data: [],
      },
    ];
  }

  ngOnInit(): void {
    this.chartsService
      .getUsersForMultipleYears(this.years)
      .subscribe((res: any[]) => {
        this.userData = res.map((response, index) => ({
          year: this.years[index],
          users: response.Data.Total,
        }));

        console.log(this.userData);
        this.plotOptions = {
          bar: {
            borderRadius: 5,
            colors: {
              ranges: [
                { from: 0, to: 10000000000000000, color: '#674ea7' }, // Rango 1: color rojo
             
                
              ],
              backgroundBarColors: ['#ccc'], // Color de fondo de las barras
              backgroundBarOpacity: 0.8, // Opacidad de las barras de fondo
              backgroundBarRadius: 5, // Radio de las esquinas de las barras de fondo
            },
          },
        };
        
        this.chart = {
          type: 'bar',
          width: '600px',
          height: '500px',
          animations: {
            enabled: true,
            easing: 'linear',
            speed: 2000,

            dynamicAnimation: {
              enabled: true,
              speed: 2000,
            },
          },
        };
        this.chartSeries[0].data = this.userData.map((data) => data.users);
        this.userData.map((data) =>
          this.chartXAxis.categories.push(data.year.toString())
        );
      });
  }
}
