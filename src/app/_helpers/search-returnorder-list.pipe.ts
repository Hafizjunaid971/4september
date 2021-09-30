import { Pipe, PipeTransform } from '@angular/core';
import { RETURNDO } from '../_models/returndo';

@Pipe({ name: 'searchRETURNList' })
export class SearchRETURNListPipe implements PipeTransform {

  transform(RETURNDO: RETURNDO[], searchText: string) {
    if (RETURNDO)
      return RETURNDO.filter(x => x.AddInventoryStock.LOTNumber.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }

}
