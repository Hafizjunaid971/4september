import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vendor } from '../_models/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  Vendor: Vendor = new Vendor();

  constructor(private http: HttpClient) { }

  add(Vendor: Vendor) {
    return this.http.post(`Vendor/add`, Vendor);
  }

  update(id: any, Vendor: any) {
    return this.http.post(`Vendor/update/${id}`, Vendor);
  }

  delete(id: any, Vendor: Vendor) {
    return this.http.post(`Vendor/delete/${id}`, Vendor);
  }

  getAllVendor() {
    return this.http.get(`Vendor/getAllVendor`);
  }

  setData(item: any) {
    this.Vendor = item;
  }

  getData() {
    return this.Vendor;
  }

}
