import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectUnsubscribedError, Observable, ReplaySubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public logIn: boolean = false;
  public userId: number;

  // public logIn2 = new ReplaySubject<boolean>(1);
  // public logIn2$ = this.logIn2.asObservable();

  public path: any;

  private loginUrl = environment.loginUrl;

  private baseUrl = environment.baseUrl;


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
    return this.httpClient.post(this.loginUrl,{
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
    // console.log(this._cookieService.get('Authorization'));
    const url = `${this.baseUrl}/checkLogin`;

    return this.httpClient.get(url,headers);
  }
}
