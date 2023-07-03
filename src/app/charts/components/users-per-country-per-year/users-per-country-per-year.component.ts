import { Component, HostListener, OnInit } from '@angular/core';
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

  public country = 'Spain';
  public year = '2020';
  public usersNumber: number = 0;
  public chartSeries!: ApexAxisChartSeries;
  public chartXAxis!: ApexXAxis;
  public plotOptions!: ApexPlotOptions;
  public chart!: ApexChart;
  public showYearsOptions:boolean =false
  public showCountriesOptions:boolean =false
  dataLabels: ApexDataLabels = {
    enabled: false,
  };
  constructor(private chartsService: ChartsService) {
    this.initValues();
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const isClickedCountry = targetElement.classList.contains('show-country');
    this.showCountriesOptions = isClickedCountry;
    const isClickedYear = targetElement.classList.contains('show-year');
    this.showYearsOptions = isClickedYear;
  }


  ngOnInit(): void {
    this.chartsService.getCountries().subscribe((countries: any) => {
      this.countries = countries.Countries;
      this.countriesList = countries.Countries;
      this.yearsList = this.years;
      this.setChart()
    });

  }

  public initValues() {
   
    this.plotOptions = {
      bar: {
        borderRadius: 5,
        colors: {
          ranges: [
            { from: 0, to: 10000000000000000, color: '#5a93c7' }, 
          ],
          backgroundBarColors: ['#ccc'], 
          backgroundBarOpacity: 0.8, 
          backgroundBarRadius: 5, 
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
    this.setChart();
  }
  filterYear(): void {
    const yearString = this.year.toString();
    this.yearsList = this.years.filter((year: number) =>
      year.toString().includes(yearString)
    );
  }

  public selectCountry(country: string) {
    this.country = country;
    this.setChart();
  }
  public selectYear(year: string) {
    this.year = year;
    this.setChart();
  }

  setChart(): void {
   
    if (this.country != '' && this.year != '') {
      this.chartsService
        .getUsersByCountryAndYear(this.country, parseInt(this.year))
        .subscribe({
          next: (res: any) => {
            this.usersNumber = res.Data[this.country].internet_users_number;

            this.initValues();
            this.chart = {
              type: 'bar',
              width: '100%',
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
          }
        });
    }
  }
}
