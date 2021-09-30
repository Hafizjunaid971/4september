import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountLedgerService {

  constructor(private http: HttpClient) { }

  getAccountLedger(toDate: any, fromDate: any, customer: any) {
    return this.http.get(`accountledger/getAccountLedger/${toDate}/${fromDate}/${customer}`);
  }

  getCustomerFromInvoice(){
    return this.http.get(`accountledger/getCustomerFromInvoice`);
  }
}
