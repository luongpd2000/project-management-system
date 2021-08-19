
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'first-project';
  closeModal!: string;

  path = "";

  constructor(private location: Location,
              private loginService: LoginService,
              private router: Router,
              private modalService: NgbModal){

  }

  ngOnInit(): void{
    this.loginService.path = this.location.path();
    console.log('appComponent: pathString...');
    console.log(this.loginService.path);

    if(this.loginService.logIn === true){
      this.router.navigate([this.loginService.path]);
    }else{
      this.loginService.isLoggedIn().subscribe(
        data =>{
          console.log(data);
          console.log(data.status);
          // this.loginService.logIn2.next(true);
          this.loginService.logIn = true;
          this.router.navigate([this.loginService.path]);
        },error => {
          console.log("có lỗi check isLogIn " + error.status)
          console.log(error);
        }
      )
    }

  }


  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
