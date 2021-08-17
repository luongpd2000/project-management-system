export class DatePicker{
    public day!:number;
    public month!:number;
    public year!:number;
    constructor(year:number,month:number,day:number){
      this.day = day;
      this.month = month;
      this.year = year;
    }
}