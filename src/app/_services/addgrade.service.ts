// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AddgradeService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { AddGrade } from '../_models/addgrade';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddgradeService {
  private AddGrade: AddGrade = new AddGrade();

  constructor(private http: HttpClient) { }

  add(AddGrade: AddGrade) {
    return this.http.post(`addgrade/add`, AddGrade);
  }

  update(id: any, AddGrade: any) {
    return this.http.post(`addgrade/update/${id}`, AddGrade);
  }

  delete(id: any, AddGrade: AddGrade) {
    return this.http.post(`addgrade/delete/${id}`, AddGrade);
  }

  getAllADDGRADE() {
    return this.http.get(`addgrade/getAllADDGRADE`);
  }

  setData(item: any) {
    this.AddGrade = item;
  }

  getData() {
    return this.AddGrade;
  }

}
