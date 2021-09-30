import { Pipe, PipeTransform } from '@angular/core';
import { Party } from '../_models/party';

@Pipe({ name: 'searchPartyList' })
export class SearchPartyListPipe implements PipeTransform {

  transform(Party: Party[], searchText: string) {
    if (Party)
      return Party.filter(x => x.Name.indexOf(searchText) !== -1);
  }

}
