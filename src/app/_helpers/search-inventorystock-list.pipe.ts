import { Pipe, PipeTransform } from '@angular/core';
import { AddInventoryStock } from '../_models/addinventorystock';

@Pipe({ name: 'searchAddInventoryList' })
export class SearchAddInventoryListPipe implements PipeTransform {

  transform(AddInventoryStock: AddInventoryStock[], searchText: string) {
    if (AddInventoryStock)
      return AddInventoryStock.filter(x => x.LOTNumber.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }

}

@Pipe({ name: 'searchAddInventoryList2' })
export class SearchAddInventoryList2Pipe implements PipeTransform {

  transform(AddInventoryStock: AddInventoryStock[], searchText2: string) {
    if (AddInventoryStock)
      return AddInventoryStock.filter(x => x.AddGrade.GradeName.toLowerCase().indexOf(searchText2.toLowerCase()) !== -1);
  }

}

@Pipe({ name: 'searchAddInventoryList3' })
export class SearchAddInventoryList3Pipe implements PipeTransform {

  transform(AddInventoryStock: AddInventoryStock[], searchText3: string) {
    if (AddInventoryStock)
      return AddInventoryStock.filter(x => x.GodownSetup.GDName.toLowerCase().indexOf(searchText3.toLowerCase()) !== -1);
  }

}

@Pipe({ name: 'searchAddInventoryList4' })
export class SearchAddInventoryList4Pipe implements PipeTransform {

  transform(AddInventoryStock: AddInventoryStock[], searchText4: string) {
    if (AddInventoryStock)
      return AddInventoryStock.filter(x => x.Quantity.toString().indexOf(searchText4) !== -1);
  }

}

@Pipe({ name: 'searchAddInventoryList5' })
export class SearchAddInventoryList5Pipe implements PipeTransform {

  transform(AddInventoryStock: AddInventoryStock[], searchText5: string) {
    if (AddInventoryStock)
      return AddInventoryStock.filter(x => x.CreatedBy.toLowerCase().toString().indexOf(searchText5.toLowerCase()) !== -1);
  }

}
