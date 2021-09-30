// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PartyService {

//   constructor() { }
// }





import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Party } from '../_models/party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  Party: Party = new Party();

  constructor(private http: HttpClient) { }

  add(Party: Party) {
    return this.http.post(`party/add`, Party);
  }

  update(id: any, Party: any) {
    return this.http.post(`party/update/${id}`, Party);
  }

  delete(id: any, Party: Party) {
    return this.http.post(`party/delete/${id}`, Party);
  }

  getAllParty() {
    return this.http.get(`party/getAllParty`);
  }

  setData(item: any) {
    this.Party = item;
  }

  getData() {
    return this.Party;
  }

}
