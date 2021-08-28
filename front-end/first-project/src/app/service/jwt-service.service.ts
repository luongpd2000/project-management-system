import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  constructor(
    private _cookieService: CookieService) { }

  getUsername(): any{
    const jwtHelper = new JwtHelperService();
    const token = this._cookieService.get('Authorization');
    // console.log(jwtHelper.decodeToken(token).sub);
    return jwtHelper.decodeToken(token).sub;
  }

  getRole(): any{
    const jwtHelper = new JwtHelperService();
    const token = this._cookieService.get('Authorization');
    // console.log(jwtHelper.decodeToken(token).role);
    return jwtHelper.decodeToken(token).role;
  }

}
