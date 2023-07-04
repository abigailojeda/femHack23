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
  public bgImage: string = './assets/img/1.jpg';
  dataLabels: ApexDataLabels = {
    enabled: false,
  };

  public showChart: boolean = false;

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

        this.plotOptions = {
          bar: {
            borderRadius: 5,
            colors: {
              ranges: [{ from: 0, to: 10000000000000000, color: '#a75094' }],
              backgroundBarColors: ['#a75094'],
              backgroundBarOpacity: 0.2,
              backgroundBarRadius: 5,
            },
          },
        };

        this.chart = {
          type: 'bar',
          width: '80%',
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
        this.chartSeries[0].data = this.userData.map((data) =>
          data.users.toLocaleString()
        );
        this.userData.map((data) =>
          this.chartXAxis.categories.push(data.year.toString())
        );
      });
  }

  public displayChart() {
    this.showChart = true;
  }
}
