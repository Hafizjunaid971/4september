// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class GodownsetupService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GodownSetup } from '../_models/godownsetup';

 @Injectable({
   providedIn: 'root'
 })
 export class GodownsetupService {


  GodownSetup: GodownSetup = new GodownSetup();

  constructor(private http: HttpClient) { }

  add(GodownSetup: GodownSetup) {
    return this.http.post(`godownsetup/add`, GodownSetup);
  }

  update(id: any, GodownSetup: any) {
    return this.http.post(`godownsetup/update/${id}`, GodownSetup);
  }

  delete(id: any, GodownSetup: GodownSetup) {
    return this.http.post(`godownsetup/delete/${id}`, GodownSetup);
  }

  getAllGodown() {
    return this.http.get(`godownsetup/getAllGodown`);
  }

  setData(item: any) {
    this.GodownSetup = item;
  }

  getData() {
    return this.GodownSetup;
  }

}
