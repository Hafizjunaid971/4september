// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ReturndocustomerService {

//   constructor() { }
// }




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RETURNDO } from '../_models/returndo';

@Injectable({
  providedIn: 'root'
})
export class ReturndocustomerService {
  RETURNDO: RETURNDO = new RETURNDO();

  constructor(private http: HttpClient) { }

  add(RETURNDO: RETURNDO) {
    return this.http.post(`returndowforcustomer/add`, RETURNDO);
  }

  update(id: any, RETURNDO: any) {
    return this.http.post(`returndowforcustomer/update/${id}`, RETURNDO);
  }

  delete(id: any, RETURNDO: RETURNDO) {
    return this.http.post(`returndowforcustomer/delete/${id}`, RETURNDO);
  }

  getAllReturnDo() {
    return this.http.get(`returndowforcustomer/getAllReturnDo`);
  }

  getAllInventoryStock() {
    return this.http.get(`addinventorystock/getAllInventoryStock`);
  }

  setData(item: any) {
    this.RETURNDO = item;
  }

  getData() {
    return this.RETURNDO;
  }

}
