import { Injectable } from '@angular/core';
import { PriceList } from '../_models/price-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  private PriceList: PriceList = new PriceList();

  constructor(private http: HttpClient) { }

  add(pricelist: PriceList) {
    return this.http.post(`productpricelist/add`, pricelist);
  }

  update(id: any, pricelist: any) {
    return this.http.post(`productpricelist/update/${id}`, pricelist);
  }

  delete(id: any, pricelist: PriceList) {
    return this.http.post(`productpricelist/delete/${id}`, pricelist);
  }

  getAllPriceList() {
    return this.http.get(`productpricelist/getAllPriceList`);
  }

  getPriceList(pricelist: PriceList) {
    return this.http.get(`productpricelist/getPriceList` + pricelist);
  }

  setData(item: any) {
    this.PriceList = item;
  }

  getData() {
    return this.PriceList;
  }

  validateProductName(product: any){
    return this.http.get(`productpricelist/validateProductName/${product}`);
  }

  validateProductCode(code: any){
    return this.http.get(`productpricelist/validateProductCode/${code}`);
  }
}
