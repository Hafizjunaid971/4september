import { Pipe, PipeTransform } from '@angular/core';
import { Invoice } from '../_models/invoice';

@Pipe({ name: 'searchInvoiceList' })
export class SearchInvoiceListPipe implements PipeTransform {

  transform(invoice: Invoice[], searchText: string) {
    if (invoice)
      return invoice.filter(x => x.InvoiceNumber.indexOf(searchText) !== -1);
  }

}

@Pipe({ name: 'searchInvoiceList2' })
export class SearchInvoiceList2Pipe implements PipeTransform {

  transform(invoice: Invoice[], searchText2: string) {
    if (invoice)
      return invoice.filter(x => x.InvoiceDate.indexOf(searchText2) !== -1);
  }

}

@Pipe({ name: 'searchInvoiceList3' })
export class SearchInvoiceList3Pipe implements PipeTransform {

  transform(invoice: Invoice[], searchText3: string) {
    if (invoice)
      return invoice.filter(x => x.Company.Name.indexOf(searchText3) !== -1);
  }

}

@Pipe({ name: 'searchInvoiceList4' })
export class SearchInvoiceList4Pipe implements PipeTransform {

  transform(invoice: Invoice[], searchText4: string) {
    if (invoice)
      return invoice.filter(x => x.TotalPayment.toString().indexOf(searchText4) !== -1);
  }

}