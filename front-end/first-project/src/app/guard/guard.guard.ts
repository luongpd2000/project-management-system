import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {



  constructor(
    private login: LoginService,
    private router: Router
) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // this.loginService.isLoggedIn().subscribe(
    //   data =>{
    //     console.log(data);
    //     console.log(data.status);
    //     this.loginService.logIn = true;
    //     // this.alert = true;
    //     this.router.navigate(['']);
    //   },error => {
    //     console.log("có lỗi check isLogIn " + error.status)
    //     console.log(error);
    //   }
    // )
      // console.log(this.login.logIn)
      if(this.login.logIn){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }

      // return true;
  }

}
