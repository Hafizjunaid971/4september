import { Injectable } from '@angular/core';
import { Customer } from '../_models/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private Customer: Customer = new Customer();

  constructor(private http: HttpClient) { }

  add(customer: Customer) {
    return this.http.post(`customer/add`, customer);
  }

  update(id: any, customer: Customer) {
    return this.http.post(`customer/update/${id}`, customer);
  }

  delete(customer: Customer) {
    return this.http.post(`customer/delete`, customer);
  }

  getAllCustomer(){
    return this.http.get(`customer/getAllCustomer`);
  }

  setData(item: any) {
    this.Customer = item;
  }

  getData() {
    return this.Customer;
  }
  
  getUniqueNumber(sequenceName: any){
    return this.http.get(`customer/getUniqueNumber/${sequenceName}`);
  }



}
