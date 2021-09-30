import { Pipe, PipeTransform } from '@angular/core';
import { Vendor } from '../_models/vendor';

@Pipe({ name: 'searchVendorList' })
export class SearchVendorListPipe implements PipeTransform {

  transform(vendor: Vendor[], searchText: string) {
    if (vendor)
      return vendor.filter(x => x.Name.indexOf(searchText) !== -1);
  }

}