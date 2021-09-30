import { Pipe, PipeTransform } from '@angular/core';
import { GodownSetup } from '../_models/godownsetup';

@Pipe({ name: 'searchGodownList' })
export class SearchGodownSetupListPipe implements PipeTransform {

  transform(godownsetup: GodownSetup[], searchText: string) {
    if (godownsetup)
      return godownsetup.filter(x => x.GDName.indexOf(searchText) !== -1);
  }

}
