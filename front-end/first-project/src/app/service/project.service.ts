import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
// import {  Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Project } from '../data/schema/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
  private bareUrl='http://localhost:8080/api/v1/';

   getAllProjects(){
    return this.http.get<any>(this.bareUrl+'project_management/admin/getAllProject');
  }

  postProject(p:Project){
    console.log(p);
    return this.http.post('http://localhost:8080/api/v1/project_management/admin/insertProject',p);
  }

  putProject(p:Project){
    console.log(p);
    return this.http.put(this.bareUrl+'project_management/admin/updateProject',p);
    
  }

  getProjectById(id:number){
    console.log("find project by id:"+id);
    return this.http.get<any>(this.bareUrl+'project_management/getProjectById/'+id);
  }

  

}
