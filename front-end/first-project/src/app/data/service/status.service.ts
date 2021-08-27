import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() { }
  colors = [{ status: "draft", color: "#8b9096" },
  { status: "pending", color: "#ed6476" },
  { status: "working", color: "#e52000" },
  { status: "reviewing", color: "#ff8000" },
  { status: "done", color: "#09922d" },
  { status: "high", color: "#e52000" },
  { status: "normal", color: "#09922d" },
  { status: "low", color: "#8b9096" },
  { status: "bug", color: "#e52000" },
  { status: "feature", color: "#09922d" },
  { status: "delete", color: "#e52000" },
  { status: "active", color: "#09922d" }
  ]
  getTheColor(status:String) {
    let rs = "#8b9096";
    this.colors.forEach(data=>{
      if(data.status===status) rs =  data.color;
    });
    return rs;
    // return this.colors.filter(item => item.status === status)[0].color;
    

  }
}
