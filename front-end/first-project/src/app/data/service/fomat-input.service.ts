import { Injectable } from '@angular/core';
import { DatePicker } from '../schema/date-picker';

@Injectable({
  providedIn: 'root'
})
export class FomatInputService {

  constructor() { }
  fomatDate(date:any): String{
    let rs='';
    let year = date.year;
    let month:String = new String(date.month);
    if(month.length==1) month = '0'+month;
    let day:String = new String(date.day);
    if(day.length==1) day = '0'+day;
    return year+'-'+month+'-'+day;
  }

  toDatePicker(date:any):DatePicker{
    let date2 = new Date(date);
    
    let rs = new DatePicker(date2.getFullYear(),date2.getMonth()+1,date2.getDate());
    
    return rs;
  }

  fomatDateToDMY(date:String){
    let dateArr=date.split('-');
    // console.log('fomat to: ', [dateArr[2],dateArr[1],dateArr[0] ].join("-"));
    
    return [dateArr[2],dateArr[1],dateArr[0] ].join("-");
  }
}
