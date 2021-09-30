import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getUniqueNumber(sequenceName: any){
    return this.http.get(`common/getUniqueNumber/${sequenceName}`);
  }

  getUniqueNumberWithDate(sequenceName: any){
    return this.http.get(`common/getUniqueNumberWithDate/${sequenceName}`);
  }
}
