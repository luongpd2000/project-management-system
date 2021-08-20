import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../data/schema/user';
import { CookieService } from 'ngx-cookie-service';
import { PasswordRecover } from '../data/schema/password-recover';

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

  getAllUsersPageable(thePage: number,
    thePageSize: number): Observable<any>{

    const userUrl = `${this.baseUrl}/admin/userList?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<any>(userUrl,this.httpOptions);

  }

  getAllUsers(){

    const userUrl = `${this.baseUrl}/admin/userList`;

    return this.httpClient.get<User[]>(userUrl,this.httpOptions);

  }
  updateUser(user : User): Observable<any> {

    const updateUserUrl = `${this.baseUrl}/updateUser`;

    return this.httpClient.put<User>(updateUserUrl,user,this.httpOptions);
  }


  getNonPartner(pId:number){
    const userUrl = `${this.baseUrl}/admin/userNotInProject/${pId}`;
    console.log(userUrl);

    return this.httpClient.get<User[]>(userUrl,this.httpOptions);
  }
  getPartner(pId:number){
    const userUrl = `${this.baseUrl}/admin/userInProject/${pId}`;
    console.log(userUrl);
    return this.httpClient.get<User[]>(userUrl,this.httpOptions);
  }


  getUsersInProject(id: number): Observable<any>{
    const url = `${this.baseUrl}/admin/findListEmployeeByProjectId/${id}`;
    return this.httpClient.get<any>(url,this.httpOptions);
  }


  deleteUser(userId : number): Observable<any> {

    const deleteUserUrl = `${this.baseUrl}/admin/deleteUser/${userId}`;

    return this.httpClient.delete<any>(deleteUserUrl,this.httpOptions);
  }

  createUser(user: User): Observable<User> {

    const createUserUrl = `${this.baseUrl}/admin/createUser`;

    return this.httpClient.post<User>(createUserUrl,user,this.httpOptions);
  }


  passwordRecover(pr: PasswordRecover): Observable<any> {

    const createUserUrl = `${this.baseUrl}/admin/passwordRecover`;

    return this.httpClient.post<any>(createUserUrl,pr,this.httpOptions);
  }



}
