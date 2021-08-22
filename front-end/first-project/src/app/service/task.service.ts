import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../data/schema/task';
import { CookieService } from 'ngx-cookie-service';
import { TaskHistory } from '../data/schema/task-history';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8080/api/v1/project_management';

  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' ,
        'Authorization': this._cookieService.get('Authorization')
      })
  };

  constructor(private httpClient: HttpClient,
    private _cookieService: CookieService) {
  }

  getTask(id: number): Observable<Task>{
    const taskUrl = `${this.baseUrl}/findTaskById/${id}`;
    return this.httpClient.get<Task>(taskUrl, this.httpOptions);
  }

  getTaskList(page: number, size: number): Observable<any> {
    const taskUrl = `${this.baseUrl}/taskList/?page=${page}&size=${size}`;
    return this.httpClient.get<any>(taskUrl, this.httpOptions);
  }


  getTaskByUser(id: number): Observable<any>{
    const url = `${this.baseUrl}/userTaskList/?userId=${id}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  getTaskByUserPageable(id: number,thePage: number,
    thePageSize: number): Observable<any>{
    const url = `${this.baseUrl}/userTaskListPageable/?userId=${id}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }


  createTask(task: Task){
    const createTaskUrl = `${this.baseUrl}/createTask`;
    return this.httpClient.post(createTaskUrl,task,this.httpOptions);
  }

  createTaskHistory(taskHis: TaskHistory){
    const createTaskUrl = `${this.baseUrl}/createTaskHistory`;
    return this.httpClient.post(createTaskUrl,taskHis,this.httpOptions);
  }

  deleteTask(task: Task){
    const deleteTaskUrl =`${this.baseUrl}/deleteTask/${task.id}`;
    return this.httpClient.delete<any>(deleteTaskUrl, this.httpOptions);
  }
  deleteTaskById(taskId:number){
    const deleteTaskUrl =`${this.baseUrl}/deleteTask/${taskId}`;
    return this.httpClient.delete<any>(deleteTaskUrl, this.httpOptions);
  }

  updateTask(task: Task){
    const updateTaskUrl = `${this.baseUrl}/updateTask/${task.id}`;
    return this.httpClient.put(updateTaskUrl, task, this.httpOptions);
  }

  getListTaskByProjectId(pId:number): Observable<any>{
    const taskUrl = `${this.baseUrl}/projectTaskListAll/?projectId=${pId}`;
    return this.httpClient.get<any>(taskUrl, this.httpOptions);
  }

  getListTaskByProjectIdPageable(pId:number,thePage: number,
    thePageSize: number): Observable<any>{
    const taskUrl = `${this.baseUrl}/projectTaskList/?projectId=${pId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<any>(taskUrl, this.httpOptions);
  }
}
