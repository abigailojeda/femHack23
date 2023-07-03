import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private apiUrl:string= environment.url;

  constructor(private http: HttpClient) {}

  //users x year ( all the world )
  getUsersByYear(year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/internet-users/${year}`);
  }
  //users x year ( specifying countries )
  getUsersAndCountries(year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/year/${year}`);
  }

  getUsersForMultipleYears(years: number[]): Observable<any[]> {
    const requests: Observable<any>[] = years.map((year) => this.getUsersByYear(year));
    return forkJoin(requests);
  }

  //countries
  getCountries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/countries`);
  }
  

  //users x year x country
  getUsersByCountryAndYear(country: string, year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/country/${country}/year/${year}`);
  }
  
}
