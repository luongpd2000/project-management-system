import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../data/schema/todo';
import { TodoHistory } from '../data/schema/todo-history';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = environment.baseUrl;

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': this._cookieService.get('Authorization')
      })
  };
  constructor(private httpClient: HttpClient,
    private _cookieService: CookieService) { }


  getTodoListOfUser(id: number, thePage: number,
    thePageSize: number): Observable<any> {

    const url = `${this.baseUrl}/findByAssignedUser/${id}?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<any>(url, this.httpOptions);

  }

  getTodoListOfUserNoPageable(id: number): Observable<any> {

    const url = `${this.baseUrl}/findByAssignedUserNoPageable/${id}`;

    return this.httpClient.get<any>(url, this.httpOptions);

  }

  getTodoListByTask(id: number, thePage: number, thePageSize: number): Observable<any> {
    const url = `${this.baseUrl}/findTodoByTaskIdPageable/${id}?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<any>(url, this.httpOptions);
  }
  getTodoListByTasNoPageable(id: number): Observable<any> {
    const url = `${this.baseUrl}/findTodoByTaskIdNoPageable/${id}`;

    return this.httpClient.get<any>(url, this.httpOptions);
  }

  createTodo(todo: Todo): Observable<any> {
    const url = `${this.baseUrl}/createTodo`;
    return this.httpClient.post<Todo>(url, todo, this.httpOptions);
  }


  updateStatus(todo: Todo): Observable<any> {
    const url = `${this.baseUrl}/updateTodo`;
    return this.httpClient.put<any>(url, todo, this.httpOptions);
  }

  insertHistory(todoHis: TodoHistory): Observable<any> {
    const url = `${this.baseUrl}/createTodoHistory`;
    return this.httpClient.post<any>(url, todoHis, this.httpOptions);
  }

  deleteTodo(idTodo: number): Observable<any> {
    const url = `${this.baseUrl}/deleteTodo/${idTodo}`;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }

  searchTodo(name: String, status: String, priority: String, type: String,
    assignedFor: number, startDate: String, endDate: String, taskId: number,projectId: number, thePage: number,
    thePageSize: number): Observable<any> {
    const url = `${this.baseUrl}/searchTodo?page=${thePage}&size=${thePageSize}` +
      `&name=${name}&priority=${priority}&status=${status}&type=${type}&assignedFor=${assignedFor}` +
      `&startDate=${startDate}&endDate=${endDate}&taskId=${taskId}&projectId=${projectId}`;
      console.log('url: ', url);

    return this.httpClient.get<any>(url, this.httpOptions);
  }
}
