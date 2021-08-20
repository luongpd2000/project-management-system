import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../data/schema/task';
import { CookieService } from 'ngx-cookie-service';

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
    // this.taskUrl = 'http://localhost:8080/api/v1/project_management';
  }

  getTask(id: number): Observable<Task>{
    const taskUrl = `${this.baseUrl}/findTaskById/${id}`;
    return this.httpClient.get<Task>(taskUrl, this.httpOptions);
  }

  getTaskList(page: 0, size: 5): Observable<any> {
    const taskUrl = `${this.baseUrl}/taskList/?page=${page}&size=${size}`;
    return this.httpClient.get<any>(taskUrl, this.httpOptions);
  }

  // createTask(task: Task){

  // }

  // deleteTask(task: Task){

  // }

  // updateTask(task: Task): Observable<any>{
  //   const updateTaskUrl = `${this.baseUrl}/updateTask`;
  //   return this.httpClient.put<Task>(updateTaskUrl, task);
  // }
}
