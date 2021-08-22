import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectUnsubscribedError, Observable, ReplaySubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public logIn: boolean = false;
  public userId: number;

  // public logIn2 = new ReplaySubject<boolean>(1);
  // public logIn2$ = this.logIn2.asObservable();

  public path: any;

  private baseUrl = 'http://localhost:8080/auth/login';

  private serverUrl = 'http://localhost:8080/api/v1/project_management';


  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json'
        //'Authorization': this._cookieService.get('Authorization')
      })
  };

  constructor(private httpClient: HttpClient,
    private router : Router,
    private _cookieService: CookieService) { }

  login(u: any, p: any): Observable<any>{
    return this.httpClient.post(this.baseUrl,{
      username: u,
      password: p
    },this.httpOptions)
  }


  logout()
  {
    // Remove the token from the cookie.
    this._cookieService.delete('Authorization');
    this.logIn = false;
    this.router.navigate(['/login']);
  }


  isLoggedIn(): Observable<any> {

    const headers = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization': this._cookieService.get('Authorization')
        })
    };
    console.log(this._cookieService.get('Authorization'));
    const url = `${this.serverUrl}/checkLogin`;

    return this.httpClient.get(url,headers);
  }
}
