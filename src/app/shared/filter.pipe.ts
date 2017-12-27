import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], by: string, keyword: string): any {
    if(!by || !keyword){
      return list
    }

    return list.filter(value => {
      return value[by].indexOf(keyword) > -1;
    })
  }

}
