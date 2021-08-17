import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private loginService: LoginService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout();
  }

}
