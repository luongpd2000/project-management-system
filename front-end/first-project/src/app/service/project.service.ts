import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Project } from '../data/schema/project';
import { CookieService } from 'ngx-cookie-service';
import { idRole } from '../data/schema/id-role';
import { ProjectDetails } from '../data/schema/project-details';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient, private _cookieService: CookieService) { }
  private bareUrl='http://localhost:8080/api/v1/';

  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' ,
        'Authorization': this._cookieService.get('Authorization')
      })
  };

   getAllProjects(){
    return this.http.get<any>(this.bareUrl+'project_management/admin/getAllProject', this.httpOptions);
  }

  postProject(p:Project){
    console.log(p);
    return this.http.post('http://localhost:8080/api/v1/project_management/admin/insertProject',p,this.httpOptions);
  }

  putProject(p:Project){
    console.log(p);
    return this.http.put(this.bareUrl+'project_management/admin/updateProject',p,this.httpOptions);
    
  }

  getProjectById(id:number){
    console.log("find project by id:"+id);
    return this.http.get<any>(this.bareUrl+'project_management/getProjectById/'+id,this.httpOptions);
  }

  deleteProject(id:number){
    console.log("delete this project:"+id);
    return this.http.delete(this.bareUrl+'project_management/admin/deleteProject/'+id,this.httpOptions);
  }

  postRole(listRole:Array<idRole>):Observable<any>{
    console.log('addUser to project');
    
    return this.http.post(this.bareUrl+"project_management/admin//addUser",listRole,this.httpOptions);
  }


  

}
