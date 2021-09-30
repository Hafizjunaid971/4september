// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class StockcounterService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

 @Injectable({
   providedIn: 'root'
 })
 export class StockcounterService {

  constructor(private http: HttpClient) { }

  // getAccountLedger(toDate: any, fromDate: any, customer: any) {
  //   return this.http.get(`accountledger/getAccountLedger/${toDate}/${fromDate}/${customer}`);
  // }

  getAllStock(){
    return this.http.get(`stockcounter/getAllStock`);
  }
}
