import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Rates {
PLN: number,
  USD: number
}

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http: HttpClient) {

  }
fetchRates(): Observable<any> {
 return this.http.get('http://data.fixer.io/api/latest?access_key=95775a188efaf95de2126dc00b38144f&format=1')
}
}
