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
  private baseUrl='http://localhost:8080/api/v1/';

  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' ,
        'Authorization': this._cookieService.get('Authorization')
      })
  };

   getAllProjects():Observable<any>{
    return this.http.get<any>(this.baseUrl+'project_management/getAllProject', this.httpOptions);
  }

  postProject(p:Project):Observable<any>{
    console.log(p);
    return this.http.post<any>('http://localhost:8080/api/v1/project_management/admin/insertProject',p,this.httpOptions);
  }

  putProject(p:Project):Observable<any>{
    console.log(p);
    return this.http.put<any>(this.baseUrl+'project_management/admin/updateProject',p,this.httpOptions);

  }

  getProjectById(id:number):Observable<any>{
    console.log("find project by id:"+id);
    return this.http.get<any>(this.baseUrl+'project_management/getProjectById/'+id,this.httpOptions);
  }

  deleteProject(id:number):Observable<any>{
    console.log("delete this project:"+id);
    return this.http.delete(this.baseUrl+'project_management/admin/deleteProject/'+id,this.httpOptions);
  }

  postRole(listRole:Array<idRole>):Observable<any>{
    console.log('addUser to project');
    return this.http.post(this.baseUrl+"project_management/admin/addUser",listRole,this.httpOptions);
  }

  deleteUserInProject(id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl+"project_management/admin/deleteProjectEmployee/"+id,this.httpOptions);
  }


  getProjectListByUserId(id: number): Observable<any>{
    return this.http.get<any>(this.baseUrl+"project_management/findProjectListByUserId/"+id,this.httpOptions);
  }

  getListProjectOfUser(id: number): Observable<any>{
    return this.http.get<any>(this.baseUrl+"project_management/getListProjectOfUser/"+id,this.httpOptions);
  }

  searchProject(name:String, status:String, startDate:String, endDate:String):Observable<any>{
    const projectUrl = `${this.baseUrl}search-project?name=${name}&status=${status}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<any>(projectUrl,this.httpOptions);
  }


}
