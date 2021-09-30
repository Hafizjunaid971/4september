import { Injectable } from '@angular/core';
import { Invoice } from '../_models/invoice';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  Invoice: Invoice = new Invoice();

  constructor(private http: HttpClient) { }

  add(Invoice: Invoice) {
    return this.http.post(`Invoice/add`, Invoice);
  }

  update(id: any, Invoice: any) {
    return this.http.post(`Invoice/update/${id}`, Invoice);
  }

  delete(id: any, Invoice: Invoice) {
    return this.http.post(`Invoice/delete/${id}`, Invoice);
  }

  getAllInvoice() {
    return this.http.get(`Invoice/getAllInvoice`);
  }

  getInvoice(Invoice: Invoice) {
    return this.http.get(`Invoice/getInvoice` + Invoice);
  }

  setData(item: any) {
    this.Invoice = item;
  }

  getData() {
    return this.Invoice;
  }

  getAllProduct() {
    return this.http.get(`Invoice/getAllProduct`);
  }

  getCodeAgainstProduct(product: any){
    return this.http.get(`Invoice/getCodeAgainstProduct/${product}`);
  }

  getProductDetailsAgainstCode(code: any){
    return this.http.get(`Invoice/getProductDetailsAgainstCode/${code}`);
  }

  getPaymentDueStatus(customer: any){
    return this.http.get(`Invoice/getPaymentDueStatus/${customer}`);
  }
}
