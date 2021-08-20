import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isAdmin: boolean;

  constructor(private loginService: LoginService,
              private route: ActivatedRoute,
              private jwtService: JwtServiceService) { }



  ngOnInit(): void {

    if(this.jwtService.getRole()==="[ROLE_ADMIN]"){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }

  }

  logout(){
    this.loginService.logout();
  }

}
