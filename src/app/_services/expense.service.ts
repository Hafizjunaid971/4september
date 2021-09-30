import { Injectable } from '@angular/core';
import { Expense } from '../_models/expense';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private Expense: Expense = new Expense();

  constructor(private http: HttpClient) { }

  add(expense: Expense) {
    return this.http.post(`expense/add`, expense);
  }

  addexpenseinvoice(expense: Expense){
    return this.http.post(`expense/addexpenseinvoice`, expense);
  }

  update(id: any, expense: Expense) {
    return this.http.post(`expense/update/${id}`, expense);
  }

  delete(id: any, expense: Expense) {
    return this.http.post(`expense/delete/${id}`, expense);
  }

  getAllExpense(){
    return this.http.get(`expense/getAllexpense`);
  }

  getExpenseTypeFromExpense(){
    return this.http.get(`expense/getExpenseTypeFromExpense`);
  }

  getExpenseLedger(toDate: any, fromDate: any, expense: any) {
    return this.http.get(`expense/getExpenseLedger/${toDate}/${fromDate}/${expense}`);
  }

  setData(item: any) {
    this.Expense = item;
  }

  getData() {
    return this.Expense;
  }
}
