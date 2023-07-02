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
  selector: 'app-users-per-country-per-year',
  templateUrl: './users-per-country-per-year.component.html',
  styleUrls: ['./users-per-country-per-year.component.scss'],
})
export class USersPerCountryPerYearComponent implements OnInit {
  public countries: any = [];
  public countriesList: any = [];
  public years: any = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
  ];
  public yearsList: any = [];

  public country = '';
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
    this.chartsService.getCountries().subscribe((countries: any) => {
      // Aquí tienes la lista de países, puedes asignarla a una variable en tu componente
      this.countries = countries.Countries;
      this.countriesList = countries.Countries;
      this.yearsList = this.years;
      // Asigna la lista de países a una variable en tu componente
      // this.paises = countries;
    });
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

  filterCountries(): void {
    this.countriesList = this.countries.filter((country: any) =>
      country.toLowerCase().includes(this.country.toLowerCase())
    );
    this.fetchData();
  }
  filterYear(): void {
    const yearString = this.year.toString();
    this.yearsList = this.years.filter((year: number) =>
      year.toString().includes(yearString)
    );
  }

  public selectCountry(country: string) {
    this.country = country;
    this.fetchData();
  }
  public selectYear(year: string) {
    this.year = year;
    this.fetchData();
  }

  fetchData(): void {
    console.log(this.country);
    console.log(this.year);
    if (this.country != '' && this.year != '') {
      this.chartsService
        .getUsersByCountryAndYear(this.country, parseInt(this.year))
        .subscribe({
          next: (res: any) => {
            this.usersNumber = res.Data[this.country].internet_users_number;

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
            this.chartSeries[0].data = [this.usersNumber];

            this.chartXAxis.categories.push(this.usersNumber);
          },

          error: (error: any) => {
            console.error('Error fetching user data:', error);
          },
        });
    }
  }
}
