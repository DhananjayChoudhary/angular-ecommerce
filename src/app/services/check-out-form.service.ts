import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../domain/country';
import { State } from '../domain/state';

@Injectable({
  providedIn: 'root'
})
export class CheckOutFormService {
 
  
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private httpClient : HttpClient) { }

  getStateList(countryCode: string):Observable<State[]> {
    const url = this.baseUrl + "states/search/findByCountryCode?code="+countryCode;
    return this.httpClient.get<GetStateResponse>(url).pipe(
     map(response => response._embedded.states)
    );
  }

  getCountryList():Observable<Country[]> {
    const url = this.baseUrl + "countries";
    return  this.httpClient.get<GetCountryResponse>(url).pipe(
                  map(response => response._embedded.countries)
              );
  }

  getMonthList(startMonth : number):Observable<number[]>{
    const numbers : number [] = [];
    for(let i=startMonth; i <= 12; i++){
         numbers.push(i);
    }
    return of(numbers);
  }

  getExpirationYearList():Observable<number[]>{
    const numbers : number [] = [];
    const startYear = new Date().getFullYear();
    const endYear = startYear+ 10;
    for(let i=startYear; i <= endYear; i++){
      numbers.push(i);
    }
    
    return of(numbers);
  }

}

interface GetCountryResponse{
  _embedded:{
    countries: Country[];
  }
}

interface GetStateResponse{
  _embedded:{
    states: State[];
  }
}