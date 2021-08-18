import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  constructor(
    private _cookieService: CookieService) { }

  getUsername(){
    const jwtHelper = new JwtHelperService();
    const token = this._cookieService.get('Authorization');
    jwtHelper.decodeToken(token);
    console.log(jwtHelper.decodeToken(token).sub);
  }
}
