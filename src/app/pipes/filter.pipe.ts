import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    console.log(value);
    if (!items) return [];
    return items.filter(it => it[field] == value);
  }

}
