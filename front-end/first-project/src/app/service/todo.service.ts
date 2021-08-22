import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Todo } from '../data/schema/todo';
import { TodoHistory } from '../data/schema/todo-history';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'http://localhost:8080/api/v1/project_management';

  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' ,
        'Authorization': this._cookieService.get('Authorization')
      })
  };
  constructor(private httpClient: HttpClient,
    private _cookieService: CookieService) { }


    getTodoListOfUser(id: number,thePage: number,
      thePageSize: number): Observable<any>{

      const url = `${this.baseUrl}/findByAssignedUser/${id}?page=${thePage}&size=${thePageSize}`;

      return this.httpClient.get<any>(url,this.httpOptions);

    }

    getTodoListOfUserNoPageable(id: number): Observable<any>{

      const url = `${this.baseUrl}/findByAssignedUserNoPageable/${id}`;

      return this.httpClient.get<any>(url,this.httpOptions);

    }

    getTodoListByTask(id: number, thePage: number, thePageSize: number):Observable<any>{
      const url = `${this.baseUrl}/findTodoByTaskIdPageable/${id}?page=${thePage}&size=${thePageSize}`;

      return this.httpClient.get<any>(url,this.httpOptions);
    }
    getTodoListByTasNoPageable(id: number):Observable<any>{
      const url = `${this.baseUrl}/findTodoByTaskIdNoPageable/${id}`;

      return this.httpClient.get<any>(url,this.httpOptions);
    }

    createTodo(todo: Todo):Observable<any>{
      const url = `${this.baseUrl}/createTodo`;
      return this.httpClient.post<Todo>(url,todo,this.httpOptions);
    }
    
  
    updateStatus(todo: Todo):Observable<any>{
      const url = `${this.baseUrl}/updateTodo`;
      return this.httpClient.put<any>(url,todo,this.httpOptions);
    }

    insertHistory(todoHis: TodoHistory):Observable<any>{
      const url = `${this.baseUrl}/createTodoHistory`;
      return this.httpClient.post<any>(url,todoHis,this.httpOptions);
    }

    deleteTodo(idTodo:number):Observable<any>{
      const url = `${this.baseUrl}/deleteTodo/${idTodo}`;
      return this.httpClient.delete<any>(url,this.httpOptions);
    }

}
