import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDMY'
})
export class DateDMYPipe implements PipeTransform {

  transform(value: String): String {
    let dateArr=value.split('-');
    return [dateArr[2],dateArr[1],dateArr[0] ].join("-");
  }

}
