import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../../services/charts.service';
import { ApexDataLabels } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';

@Component({
  selector: 'app-countries-ranking',
  templateUrl: './countries-ranking.component.html',
  styleUrls: ['./countries-ranking.component.scss'],
})
export class CountriesRankingComponent implements OnInit {
  public years: any = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
  ];
  public yearsList: any = [];
  public year = '';
  public usersNumber: number = 0;
  public chartSeries!: ApexAxisChartSeries;
  public chartXAxis!: ApexXAxis;
  public plotOptions!: ApexPlotOptions;
  public chart!: ApexChart;
  dataLabels: ApexDataLabels = {
    enabled: false,
  };
  constructor(private chartsService: ChartsService) {
    this.initValues();
  }

  ngOnInit(): void {
    this.yearsList = this.years;
  }

  public initValues() {
    this.plotOptions = {
      bar: {
        borderRadius: 5,
        colors: {
          ranges: [
            { from: 0, to: 10000000000000000, color: '#5a93c7' }, // Rango 1: color rojo
          ],
          backgroundBarColors: ['#ccc'], // Color de fondo de las barras
          backgroundBarOpacity: 0.8, // Opacidad de las barras de fondo
          backgroundBarRadius: 5, // Radio de las esquinas de las barras de fondo
        },
      },
    };
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
  filterYear(): void {
    const yearString = this.year.toString();
    this.yearsList = this.years.filter((year: number) =>
      year.toString().includes(yearString)
    );
  }

  public selectYear(year: string) {
    this.year = year;
    this.fetchData();
  }

  fetchData(): void {
    if (this.year != '') {
      this.chartsService.getUsersAndCountries(parseInt(this.year)).subscribe({
        next: (res: any) => {
          const countriesData = res.Data;

          // Obtener los 10 países con mayor número de usuarios de Internet
          const topCountries = Object.keys(countriesData)
            .map((country: string) => ({
              country,
              users: countriesData[country].internet_users_number,
            }))
            .sort((a, b) => b.users - a.users)
            .slice(0, 10);
          console.log(topCountries);
          this.initValues();
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
          this.chartXAxis.categories = topCountries.map((data) => data.country);
          this.chartSeries[0].data = topCountries.map((data) => data.users);
        },

        error: (error: any) => {
          console.error('Error fetching user data:', error);
        },
      });
    }
  }
}
