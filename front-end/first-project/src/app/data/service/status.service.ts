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
  { status: "low", color: "#e52000" },
  { status: "bug", color: "#e52000" },
  { status: "feature", color: "#09922d" }

  ]
  getTheColor(status) {
    return this.colors.filter(item => item.status === status)[0].color;
  }
}
