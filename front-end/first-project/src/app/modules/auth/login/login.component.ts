import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/service/user.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logIn!: FormGroup;


  constructor(private loginService: LoginService,
              private route: ActivatedRoute,
              private router : Router,
              private userService : UserService,
              private jwtService : JwtServiceService,
              private _cookieService: CookieService) { }

  ngOnInit(): void {

    // this.loginService.isLoggedIn().subscribe(
    //   data =>{
    //     console.log(data);
    //     console.log(data.status);
    //     // this.loginService.logIn2.next(true);
    //     this.loginService.logIn = true;
    //     this.router.navigate(['']);
    //   },error => {
    //     console.log("có lỗi check isLogIn " + error.status)
    //     console.log(error);
    //   }
    // )

    if(this.loginService.logIn){
      this.router.navigate([this.loginService.path]);
    }

    this.logIn = new FormGroup({
      username: new FormControl('',[
        Validators.maxLength(50)
        // ProjectManagementSystemValidators.notOnlyWhitespace
      ]),
      password: new FormControl('',[
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])
    })
  }


  login(){
    console.log("login");

    if (this.logIn.invalid) {
      this.logIn.markAllAsTouched();
      console.log("false " + this.logIn.status)
      return;
    }

    const u = this.logIn.controls['username'].value;
    const p = this.logIn.controls['password'].value;

    console.log("ok " + u +" "+ p)

    this.loginService.login(u,p).subscribe(
      data =>{
        console.log(data.status);
        this._cookieService.set("Authorization",data.Authorization)
        this.loginService.logIn = true;
        this.router.navigate([this.loginService.path==="/login"? "" : this.loginService.path]);
        this.userService.getUser(this.jwtService.getUsername()).subscribe(
          data=>{
            this.loginService.userId = data.id;
          },error => {
            console.log("có lỗi " + error.status.message)
            console.log(error);
          }
        )
      }, error =>{
        console.log(error + " có lỗi login");
    })


  }



  get username() { return this.logIn.get('username');}
  get password() { return this.logIn.get('password');}

}
