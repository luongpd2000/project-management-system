import { Injectable } from '@angular/core';
import { DatePicker } from '../schema/date-picker';

@Injectable({
  providedIn: 'root'
})
export class FomatInputService {

  constructor() { }
  fomatDate(date:any): string{
    let rs='';
    let year = date.year;
    let month:String = new String(date.month);
    if(month.length==1) month = '0'+month;
    let day:String = new String(date.day);
    if(day.length==1) day = '0'+day;
    return year+'-'+month+'-'+day;
  }

  toDatePicker(date:string):DatePicker{
    let date2 = new Date(date);
    let rs = new DatePicker(date2.getFullYear(),date2.getMonth(),date2.getDay());
    return rs;
  }
}
