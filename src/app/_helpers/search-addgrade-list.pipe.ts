import { Pipe, PipeTransform } from '@angular/core';
import { AddGrade} from '../_models/addgrade';

@Pipe({ name: 'searchAddGradeList' })
export class SearchAddGradeListPipe implements PipeTransform {

  transform(AddGrade: AddGrade[], searchText: string) {
    if (AddGrade)
      return AddGrade.filter(x => x.GradeName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }

}
