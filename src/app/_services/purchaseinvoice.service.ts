import { Injectable } from '@angular/core';
import { PurchaseInvoice } from '../_models/purchaseinvoice';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseinvoiceService {

  private PurchaseInvoice: PurchaseInvoice = new PurchaseInvoice();

  constructor(private http: HttpClient) { }

  add(purchaseinvoice: PurchaseInvoice) {
    return this.http.post(`purchaseinvoice/add`, purchaseinvoice);
  }

  update(id: any, purchaseinvoice: any) {
    return this.http.post(`purchaseinvoice/update/${id}`, purchaseinvoice);
  }

  delete(id: any, purchaseinvoice: PurchaseInvoice) {
    return this.http.post(`purchaseinvoice/delete/${id}`, purchaseinvoice);
  }

  getAllPurchaseInvoice() {
    return this.http.get(`purchaseinvoice/getAllPurchaseInvoice`);
  }

  getPurchaseInvoice(purchaseinvoice: PurchaseInvoice) {
    return this.http.get(`purchaseinvoice/getPurchaseInvoice` + purchaseinvoice);
  }

  setData(item: any) {
    this.PurchaseInvoice = item;
  }

  getData() {
    return this.PurchaseInvoice;
  }
}
