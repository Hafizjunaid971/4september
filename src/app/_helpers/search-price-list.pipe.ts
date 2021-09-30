import { Pipe, PipeTransform } from '@angular/core';
import { PriceList } from '../_models/price-list';

@Pipe({ name: 'searchPriceList' })
export class SearchPriceListPipe implements PipeTransform {

  transform(priceList: PriceList[], searchText: string) {
    if (priceList)
      return priceList.filter(x => x.Name.indexOf(searchText) !== -1);
  }

}