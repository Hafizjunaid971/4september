// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AddstockinventoryService {

//   constructor() { }
// }





import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddInventoryStock } from '../_models/addinventorystock';

@Injectable({
  providedIn: 'root'
})
export class AddstockinventoryService {

  AddInventoryStock: AddInventoryStock = new AddInventoryStock();

  constructor(private http: HttpClient) { }

  add(AddInventoryStock: AddInventoryStock) {
    return this.http.post(`addinventorystock/add`, AddInventoryStock);
  }

  update(id: any, AddInventoryStock: any) {
    return this.http.post(`addinventorystock/update/${id}`, AddInventoryStock);
  }

  delete(id: any, AddInventoryStock: AddInventoryStock) {
    return this.http.post(`addinventorystock/delete/${id}`, AddInventoryStock);
  }

  getAllInventoryStock() {
    return this.http.get(`addinventorystock/getAllInventoryStock`);
  }


  getAllADDGRADE() {
    return this.http.get(`addgrade/getAllADDGRADE`);
  }

  getAllGodown() {
    return this.http.get(`godownsetup/getAllGodown`);
  }


  getAllStockIn() {
    return this.http.get(`addinventorystock/getAllStockIn`);
  }

  getAllUser() {
    return this.http.get(`usermanagement/getAllUser`);
  }

  setData(item: any) {
    this.AddInventoryStock = item;
  }

  getData() {
    return this.AddInventoryStock;
  }

}
