import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from "../models/todo";
import {FilterEnum} from "../models/filter.enum";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Todo[], filter: FilterEnum): any {
    if (!items) {
      return [];
    }

    if (!filter || filter.toString() === FilterEnum.ALL.toString()) {
      return items;
    }

    if (filter.toString() === FilterEnum.ACTIVE.toString()) {
      return items.filter((it) => {
        return !it.checked;
      });
    }

    if (filter.toString() === FilterEnum.COMPLETED.toString()) {
      return items.filter((it) => {
        return it.checked;
      });
    }
  }

}
