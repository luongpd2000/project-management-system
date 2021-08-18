import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../data/schema/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/v1/project_management';


  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' ,
        'Authorization': this._cookieService.get('Authorization')
      })
  };

  //userId: number = 1;

  constructor(private httpClient: HttpClient,
    private _cookieService: CookieService) { }

  // getUser(userId : number): Observable<User>{

  //   const userUrl = `${this.baseUrl}/findUserById/${userId}`;

  //   return this.httpClient.get<User>(userUrl);

  // }

  getUser(username : String): Observable<User>{

    const userUrl = `${this.baseUrl}/findUserByUsername/${username}`;

    return this.httpClient.get<User>(userUrl,this.httpOptions);

  }


  updateUser(user : User): Observable<any> {

    const updateUserUrl = `${this.baseUrl}/updateUser`;

    return this.httpClient.put<User>(updateUserUrl,user);
  }

}
