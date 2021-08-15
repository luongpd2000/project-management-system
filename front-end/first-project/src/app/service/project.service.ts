import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
  private bareUrl='http://localhost:8080/api/v1/';
  
   getAllProjects(){
    return this.http.get<any>(this.bareUrl+'project_management/admin/getAllProject');
  }
}