import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private Product: Product = new Product();

  constructor(private http: HttpClient) { }

  add(product: Product) {
    return this.http.post(`productinventory/add`, product);
  }

  update(id: any, product: any) {
    return this.http.post(`productinventory/update/${id}`, product);
  }

  delete(id: any, product: Product) {
    return this.http.post(`productinventory/delete/${id}`, product);
  }

  getAllProduct() {
    return this.http.get(`productinventory/getAllProduct`);
  }

  getProduct(product: Product) {
    return this.http.get(`productinventory/getProduct` + product);
  }

  setData(item: any) {
    this.Product = item;
  }

  getData() {
    return this.Product;
  }

  getProductDetails(product: any){
    return this.http.get(`productinventory/getProductDetails/${product}`);
  }

  getProductDetailsFromPriceList(product: any){
    return this.http.get(`productinventory/getProductDetailsFromPriceList/${product}`);
  }

  checkProductAlreadyAdded(product: any){
    return this.http.get(`productinventory/checkProductAlreadyAdded/${product}`);
  }
}
