import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReturnInvoice } from '../_models/returninvoice';

@Injectable({
  providedIn: 'root'
})
export class ReturninviceService {

  constructor(private http: HttpClient) { }

  ReturnInvoice: ReturnInvoice = new ReturnInvoice();

  getAllReturnInvoice(){
    return this.http.get(`returninvoice/getAllReturnInvoice`);
  }

  getInvoiceDetails(invoiceNo: any){
    return this.http.get(`returninvoice/getInvoiceDetails/${invoiceNo}`);
  }

  add(invoice: any) {
    return this.http.post(`returninvoice/add`, invoice);
  }

  setData(item: any) {
    this.ReturnInvoice = item;
  }

  getData() {
    return this.ReturnInvoice;
  }

}
