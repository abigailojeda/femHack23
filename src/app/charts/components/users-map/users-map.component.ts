import { Component, HostListener, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ChartsService } from '../../services/charts.service';
import { CountriesDataService } from '../../services/countries-data.service';

@Component({
  selector: 'app-users-map',
  templateUrl: './users-map.component.html',
  styleUrls: ['./users-map.component.scss'],
})
export class UsersMapComponent implements OnInit {
  //  public map: Map | undefined;
  private map: L.Map | undefined;

  public countries: any;
  public years: any = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
  ];
  public yearsList: any = [];
  public countriesList: any = [];
  public countriesListAux: any = [];
  public showYearsOptions:boolean =false
  public showCountriesOptions:boolean =false
  public country = '';
  public year = '2018';
  public countriesData: {} = {};

  constructor(
    private chartsService: ChartsService,
    private CountriesDataService: CountriesDataService
  ) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const isClickedCountry = targetElement.classList.contains('show-country-map');
    this.showCountriesOptions = isClickedCountry;
    const isClickedYear = targetElement.classList.contains('show-year-map');
    this.showYearsOptions = isClickedYear;
  }

  ngOnInit() {
    this.countriesData = this.CountriesDataService.getCountriesData();
    const countryNames = Object.keys(this.countriesData);

    this.countriesList = countryNames;
    this.countriesListAux = countryNames;
    this.initializeMap();
    this.yearsList = this.years;
    this.setUsers();
  }

  private initializeMap() {
    const mapContainer = document.getElementById('mapContainer');
    if (mapContainer) {
      const map = L.map(mapContainer).setView([46.603354, 1.888334], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a target="_blank" href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      }).addTo(map);

      this.map! = map;
    } 
  }

  public setUsers() {
    this.chartsService
      .getUsersAndCountries(parseInt(this.year))
      .subscribe((response) => {
        this.countries = response.Data;
        this.addMarkers();
      });
  }

  private addMarkers(): void {
    const countriesData = this.CountriesDataService.getCountriesData();
    const markerIcon = L.icon({
      iconUrl: './assets/img/marker.svg',
      iconSize: [32, 32],
      shadowUrl: '',
    });

    Object.entries(countriesData).forEach(
      ([countryName, countryCoordinates]: [string, number[]]) => {
        const countryData = this.countries[countryName];

        if (countryData) {
          const internetUsersNumber = countryData.internet_users_number;
          const [lat, lon] = countryCoordinates;

          const marker = L.marker([lat, lon], { icon: markerIcon }).addTo(
            this.map!
          );
          marker.bindTooltip(
            `${countryName}: ${internetUsersNumber.toLocaleString()}`
          );
        }
      }
    );
  }

  public filterCountries(): void {
    this.countriesList = this.countriesListAux.filter((country: any) =>
      country.toLowerCase().includes(this.country.toLowerCase())
    );
  }

  public filterYear(): void {
    const yearString = this.year.toString();
    this.yearsList = this.years.filter((year: number) =>
      year.toString().includes(yearString)
    );
  }

  public selectCountry(country: string) {
    this.country = country;
    //this.fetchData();
    const countryData = this.CountriesDataService.getCountryData(country);
    if (countryData) {
      this.updateMapLocation(countryData);
    }
  }


  public selectYear(year: string) {
    this.year = year;
    // this.clearMarkers();

    this.setUsers();
  }

  // private clearMarkers(): void {
  //   if (this.map) {
  //     this.map.eachLayer(layer => {
  //       if (layer instanceof L.Marker) {
  //         this.map!.removeLayer(layer);
  //       }
  //     });
  //   }
  // }

  updateMapLocation(coordinates: any) {
    if (this.map) {
      this.map.setView(coordinates, 6);
    } else {
      console.error('Map not initialized');
    }
  }
}
