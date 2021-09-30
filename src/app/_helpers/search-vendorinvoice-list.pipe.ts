import { Pipe, PipeTransform } from '@angular/core';
import { VendorLedger } from '../_models/vendorledger';

@Pipe({ name: 'searchVendorList' })
export class SearchVendorLedgerListPipe implements PipeTransform {

  transform(vendorledger: VendorLedger[], searchText: string) {
    if (vendorledger)
      return vendorledger.filter(x => x.Vendor.indexOf(searchText) !== -1);
  }

}
