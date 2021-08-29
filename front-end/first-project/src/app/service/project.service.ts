import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Project } from '../data/schema/project';
import { CookieService } from 'ngx-cookie-service';
import { idRole } from '../data/schema/id-role';
import { ProjectDetails } from '../data/schema/project-details';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient, private _cookieService: CookieService) { }
  private baseUrl=environment.baseUrl;

  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' ,
        'Authorization': this._cookieService.get('Authorization')
      })
  };

   getAllProjects():Observable<any>{
    return this.http.get<any>(this.baseUrl+'/getAllProject', this.httpOptions);
  }

  postProject(p:Project):Observable<any>{
    // console.log(p);
    return this.http.post<any>(this.baseUrl+'/admin/insertProject',p,this.httpOptions);
  }

  putProject(p:Project):Observable<any>{
    // console.log(p);
    return this.http.put<any>(this.baseUrl+'/admin/updateProject',p,this.httpOptions);

  }

  getProjectById(id:number):Observable<any>{
    // console.log("find project by id:"+id);
    return this.http.get<any>(this.baseUrl+'/getProjectById/'+id,this.httpOptions);
  }

  deleteProject(id:number):Observable<any>{
    // console.log("delete this project:"+id);
    return this.http.delete(this.baseUrl+'/admin/deleteProject/'+id,this.httpOptions);
  }

  postRole(listRole:Array<idRole>):Observable<any>{
    // console.log('addUser to project');
    return this.http.post(this.baseUrl+"/admin/addUser",listRole,this.httpOptions);
  }

  deleteUserInProject(id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl+"/admin/deleteProjectEmployee/"+id,this.httpOptions);
  }


  getProjectListByUserId(id: number): Observable<any>{
    return this.http.get<any>(this.baseUrl+"/findProjectListByUserId/"+id,this.httpOptions);
  }

  getListProjectOfUser(id: number): Observable<any>{
    return this.http.get<any>(this.baseUrl+"/getListProjectOfUser/"+id,this.httpOptions);
  }

  searchProject(name:String, status:String, startDate:String, endDate:String):Observable<any>{
    const projectUrl = `${this.baseUrl}/search-project?name=${name}&status=${status}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<any>(projectUrl,this.httpOptions);
  }

  searchProjectWithUserId(name:String, status:String, startDate:String, endDate:String, uId:number):Observable<any>{
    const projectUrl = `${this.baseUrl}/searchProjectWithUserId?uId=${uId}&name=${name}&status=${status}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<any>(projectUrl,this.httpOptions);
  }

  findListEmployeeByProjectId(id: number){
    const projectUrl = `${this.baseUrl}/findListEmployeeByProjectId/${id}`;
    return this.http.get<any>(projectUrl,this.httpOptions);
  }

}
