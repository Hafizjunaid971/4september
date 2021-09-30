import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../_models/expense';

@Pipe({ name: 'searchExpenseList' })
export class SearchExpenseListPipe implements PipeTransform {

  transform(expense: Expense[], searchText: string) {
    if (expense)
      return expense.filter(x => x.Expense.indexOf(searchText) !== -1);
  }

}