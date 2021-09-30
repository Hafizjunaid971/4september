import { Pipe, PipeTransform } from '@angular/core';
import { DOSETUP } from '../_models/dosetup';

@Pipe({ name: 'searchDOSETUPList' })
export class SearchDOSETUPListPipe implements PipeTransform {

  transform(DOSETUP: DOSETUP[], searchText: string) {
    if (DOSETUP)
      return DOSETUP.filter(x => x.serialnumber.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }

}

@Pipe({ name: 'searchDOSETUPList2' })
export class SearchDOSETUPList2Pipe implements PipeTransform {

  transform(DOSETUP: DOSETUP[], searchText2: string) {
    if (DOSETUP)
      return DOSETUP.filter(x => x.AddInventoryStock.GodownSetup.GDName.toLowerCase().indexOf(searchText2.toLowerCase()) !== -1);
  }

}

@Pipe({ name: 'searchDOSETUPList3' })
export class SearchDOSETUPList3Pipe implements PipeTransform {

  transform(DOSETUP: DOSETUP[], searchText3: string) {
    if (DOSETUP)
      return DOSETUP.filter(x => x.Customer.Name.toLowerCase().indexOf(searchText3.toLowerCase()) !== -1);
  }

}

@Pipe({ name: 'searchDOSETUPList4' })
export class SearchDOSETUPList4Pipe implements PipeTransform {

  transform(DOSETUP: DOSETUP[], searchText4: string) {
    if (DOSETUP)
      return DOSETUP.filter(x => x.Quantity.toString().indexOf(searchText4) !== -1);
  }

}

@Pipe({ name: 'searchDOSETUPList5' })
export class SearchDOSETUPList5Pipe implements PipeTransform {

  transform(DOSETUP: DOSETUP[], searchText5: string) {
    if (DOSETUP)
      return DOSETUP.filter(x => x.AddInventoryStock.LOTNumber.toLowerCase().indexOf(searchText5.toLowerCase()) !== -1);
  }

}
