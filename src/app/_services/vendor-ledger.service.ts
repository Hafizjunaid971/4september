import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VendorLedger } from '../_models/vendorledger';
import { PurchaseInvoice } from '../_models/purchaseinvoice';


@Injectable({
  providedIn: 'root'
})
export class VendorLedgerService {

  // PurchaseInvoice: PurchaseInvoice = new PurchaseInvoice();

  VendorLedger: VendorLedger = new VendorLedger();


  constructor(private http: HttpClient) { }

  add(dto: VendorLedger) {
    return this.http.post(`vendorledger/add`, dto);
  }

  getAllVendor(){
    return this.http.get(`vendorledger/getAllVendor`);
  }

  getVendorFromVendorLedger(){
    return this.http.get(`vendorledger/getVendorFromVendorLedger`);
  }

  getVendorLedger(toDate: any, fromDate: any, vendor: any) {
    return this.http.get(`vendorledger/getVendorLedger/${toDate}/${fromDate}/${vendor}`);
  }

  getAllVendorLedger() {
    return this.http.get(`vendorledger/getAllVendorLedger`);
  }


  update(id: any, VendorLedger: any) {
    return this.http.post(`vendorledger/update/${id}`, VendorLedger);
  }

  delete(id: any, VendorLedger: VendorLedger) {
    return this.http.post(`vendorledger/delete/${id}`, VendorLedger);
  }




  setData(item: any) {
    this.VendorLedger = item;
  }

  getData() {
    return this.VendorLedger;
  }


  getUniqueNumber(sequenceName: any){
    return this.http.get(`vendorledger/getUniqueNumber/${sequenceName}`);
  }


}
