import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

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
}
