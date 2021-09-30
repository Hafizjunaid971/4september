// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AgentdoreleaseService {

//   constructor() { }
// }




// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { DOSETUP } from '../_models/dosetup';

//  @Injectable({
//    providedIn: 'root'
//  })
//  export class AgentdoreleaseService {

//   DOSETUP: DOSETUP = new DOSETUP();

//   constructor(private http: HttpClient) { }

//   add(DOSETUP: DOSETUP) {
//     return this.http.post(`dosetup/add`, DOSETUP);
//   }

//   update(id: any, DOSETUP: any) {
//     return this.http.post(`dosetup/update/${id}`, DOSETUP);
//   }

//   delete(id: any, DOSETUP: DOSETUP) {
//     return this.http.post(`dosetup/delete/${id}`, DOSETUP);
//   }

//   getAllDOSETUP() {
//     return this.http.get(`dosetup/getAllDOSETUP`);
//   }


//   getAllInventoryStock() {
//     return this.http.get(`addinventorystock/getAllInventoryStock`);
//   }



//   setData(item: any) {
//     this.DOSETUP = item;
//   }

//   getData() {
//     return this.DOSETUP;
//   }

// }



//13 september






import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgentDOReleaseSetup } from '../_models/agentreleasedo';

 @Injectable({
   providedIn: 'root'
 })
 export class AgentdoreleaseService {

  AgentDOReleaseSetup: AgentDOReleaseSetup = new AgentDOReleaseSetup();

  constructor(private http: HttpClient) { }

  add(AgentDOReleaseSetup: AgentDOReleaseSetup) {
    return this.http.post(`agentdocustomer/add`, AgentDOReleaseSetup);
  }

  update(id: any, AgentDOReleaseSetup: any) {
    return this.http.post(`agentdocustomer/update/${id}`, AgentDOReleaseSetup);
  }

  delete(id: any, AgentDOReleaseSetup: AgentDOReleaseSetup) {
    return this.http.post(`agentdocustomer/delete/${id}`, AgentDOReleaseSetup);
  }


  getCustomerWorkOrder(_id: any){
    return this.http.get(`agentdocustomer/getCustomerWorkOrder/${_id}`);
  }


  getAllDOCustomer() {
    return this.http.get(`agentdocustomer/getAllDOCustomer`);
  }

  getAllDOSETUP() {
    return this.http.get(`dosetup/getAllDOSETUP`);
  }

  getAllInventoryStock() {
    return this.http.get(`addinventorystock/getAllInventoryStock`);
  }


  setData(item: any) {
    this.AgentDOReleaseSetup = item;
  }

  getData() {
    return this.AgentDOReleaseSetup;
  }

}

