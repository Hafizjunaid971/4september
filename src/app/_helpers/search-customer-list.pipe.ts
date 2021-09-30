import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../_models/customer';

@Pipe({ name: 'searchCustomerList' })
export class SearchCustomerListPipe implements PipeTransform {

  transform(customer: Customer[], searchText: string) {
    if (customer)
      return customer.filter(x => x.CustomerID.indexOf(searchText) !== -1);
  }

}

@Pipe({ name: 'searchCustomerList2' })
export class SearchCustomerList2Pipe implements PipeTransform {

  transform(dto: Customer[], searchText2: string) {
    if (dto)
      return dto.filter(x => x.CompanyName.indexOf(searchText2) !== -1);
  }

}

@Pipe({ name: 'searchCustomerList3' })
export class SearchCustomerList3Pipe implements PipeTransform {

  transform(dto: Customer[], searchText3: string) {
    if (dto)
      return dto.filter(x => x.Phone.indexOf(searchText3) !== -1);
  }

}

@Pipe({ name: 'searchCustomerList4' })
export class SearchCustomerList4Pipe implements PipeTransform {

  transform(dto: Customer[], searchText4: string) {
    if (dto)
      return dto.filter(x => x.Phone.indexOf(searchText4) !== -1);
  }

}