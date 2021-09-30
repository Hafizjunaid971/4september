import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../_models/product';

@Pipe({ name: 'searchProductInventoryList' })
export class SearchProductInventoryListPipe implements PipeTransform {

  transform(productInventoryList: Product[], seachProductInventory: string) {
    if (productInventoryList)
      return productInventoryList.filter(x => x.Name.indexOf(seachProductInventory) !== -1);
  }

}