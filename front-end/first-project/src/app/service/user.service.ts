import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../data/schema/user';
import { CookieService } from 'ngx-cookie-service';
import { PasswordRecover } from '../data/schema/password-recover';
import { ProjectEmployee } from '../data/schema/project-employee';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1/project_management';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this._cookieService.get('Authorization'),
    }),
  };

  //userId: number = 1;

  constructor(
    private httpClient: HttpClient,
    private _cookieService: CookieService
  ) {}

  getUserById(userId: number): Observable<User> {
    const userUrl = `${this.baseUrl}/findUserById/${userId}`;

    return this.httpClient.get<User>(userUrl, this.httpOptions);
  }
  getUser(username: String): Observable<User> {
    const userUrl = `${this.baseUrl}/findUserByUsername/${username}`;

    return this.httpClient.get<User>(userUrl, this.httpOptions);
  }

  getAllUsersPageable(thePage: number, thePageSize: number): Observable<any> {
    const userUrl = `${this.baseUrl}/admin/userList?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<any>(userUrl, this.httpOptions);
  }

  getAllUsersActivePageable(
    thePage: number,
    thePageSize: number
  ): Observable<any> {
    const userUrl = `${this.baseUrl}/admin/userActiveList?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<any>(userUrl, this.httpOptions);
  }

  getAllUsersDeletePageable(
    thePage: number,
    thePageSize: number
  ): Observable<any> {
    const userUrl = `${this.baseUrl}/admin/userDeletedList?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<any>(userUrl, this.httpOptions);
  }

  getAllUsers() {
    const userUrl = `${this.baseUrl}/admin/findAllUser`;

    return this.httpClient.get<User[]>(userUrl, this.httpOptions);
  }
  updateUser(user: User): Observable<any> {
    const updateUserUrl = `${this.baseUrl}/updateUser`;

    return this.httpClient.put<User>(updateUserUrl, user, this.httpOptions);
  }

  getNonPartner(pId: number) {
    const userUrl = `${this.baseUrl}/userNotInProject/${pId}`;
    console.log(userUrl);

    return this.httpClient.get<User[]>(userUrl, this.httpOptions);
  }

  getPartner(pId: number) {
    const userUrl = `${this.baseUrl}/admin/userInProject/${pId}`;
    console.log(userUrl);
    return this.httpClient.get<User[]>(userUrl, this.httpOptions);
  }

  getUsersInProject(id: number): Observable<any> {
    const url = `${this.baseUrl}/findListEmployeeByProjectId/${id}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  getUsersActiveInProject(id: number): Observable<any> {
    const url = `${this.baseUrl}/findListEmployeeActiveByProjectId/${id}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  getUsersDeletedInProject(id: number): Observable<any> {
    const url = `${this.baseUrl}/findListEmployeeDeletedByProjectId/${id}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  deleteUser(userId: number): Observable<any> {
    const deleteUserUrl = `${this.baseUrl}/admin/deleteUser/${userId}`;

    return this.httpClient.delete<any>(deleteUserUrl, this.httpOptions);
  }

  createUser(user: User): Observable<User> {
    const createUserUrl = `${this.baseUrl}/admin/createUser`;

    return this.httpClient.post<User>(createUserUrl, user, this.httpOptions);
  }

  passwordRecover(pr: PasswordRecover): Observable<any> {
    const createUserUrl = `${this.baseUrl}/admin/passwordRecover`;

    return this.httpClient.post<any>(createUserUrl, pr, this.httpOptions);
  }

  updateProjectEmployee(pe: ProjectEmployee): Observable<any> {
    const updateUrl = `${this.baseUrl}/admin/updateProjectEmployee`;
    return this.httpClient.put<any>(updateUrl, pe, this.httpOptions);
  }

  searchUser(
    username: String,
    fullname: String,
    email: String,
    address: String,
    phone: String
  ): Observable<any> {
    const projectUrl = `${this.baseUrl}/admin/searchUser?username=${username}&fullname=${fullname}&email=${email}&address=${address}&phone=${phone}`;
    return this.httpClient.get<any>(projectUrl, this.httpOptions);
  }

  searchUsersNotInProject(
    idP: number,
    username: String,
    fullname: String,
    email: String,
    phone: String
  ): Observable<any> {
    const projectUrl = `${this.baseUrl}/admin/searchUsersNotInProject?idP=${idP}&username=${username}&fullname=${fullname}&email=${email}&phone=${phone}`;
    return this.httpClient.get<any>(projectUrl, this.httpOptions);
  }

  searchUsersInProject(
    idP: number,
    username: String,
    fullname: String,
    email: String,
    phone: String,
    role: String
  ): Observable<any> {
    const projectUrl = `${this.baseUrl}/admin/searchUsersInProject?idP=${idP}&username=${username}&fullname=${fullname}&email=${email}&phone=${phone}&role=${role}`;
    return this.httpClient.get<any>(projectUrl, this.httpOptions);
  }
}
