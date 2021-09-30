import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../_models';

@Pipe({ name: 'searchUserList' })
export class SearchUserListPipe implements PipeTransform {

  transform(dto: User[], searchText: string) {
    if (dto)
      return dto.filter(x => x.UserId.indexOf(searchText) !== -1);
  }

}

@Pipe({ name: 'searchUserList2' })
export class SearchUserList2Pipe implements PipeTransform {

  transform(dto: User[], searchText2: string) {
    if (dto)
      return dto.filter(x => x.Name.indexOf(searchText2) !== -1);
  }

}
