import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../data/schema/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/v1/project_management';

  //userId: number = 1;

  constructor(private httpClient: HttpClient) { }

  getUser(userId : number): Observable<User>{

   // userId = this.userId;

    const userUrl = `${this.baseUrl}/findUserById/${userId}`;

    return this.httpClient.get<User>(userUrl);

  }


  updateUser(user : User): Observable<any> {

    const updateUserUrl = `${this.baseUrl}/updateUser`;

    return this.httpClient.put<User>(updateUserUrl,user);
  }

}
