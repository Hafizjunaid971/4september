// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class DosetupService {

//   constructor() { }
// }




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOSETUP } from '../_models/dosetup';

@Injectable({
  providedIn: 'root'
})

export class DosetupService {


  DOSETUP: DOSETUP = new DOSETUP();

  constructor(private http: HttpClient) { }

  add(DOSETUP: DOSETUP) {
    return this.http.post(`dosetup/add`, DOSETUP);
  }

  update(id: any, DOSETUP: any) {
    return this.http.post(`dosetup/update/${id}`, DOSETUP);
  }

  delete(id: any, DOSETUP: DOSETUP) {
    return this.http.post(`dosetup/delete/${id}`, DOSETUP);
  }

  getAllDOSETUP() {
    return this.http.get(`dosetup/getAllDOSETUP`);
  }


  getAllInventoryStock() {
    return this.http.get(`addinventorystock/getAllInventoryStock`);
  }



  setData(item: any) {
    this.DOSETUP = item;
  }

  getData() {
    return this.DOSETUP;
  }

  getUniqueNumber(sequenceName: any){
    return this.http.get(`dosetup/getUniqueNumber/${sequenceName}`);
  }

}
