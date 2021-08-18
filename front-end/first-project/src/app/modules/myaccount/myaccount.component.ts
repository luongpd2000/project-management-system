import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/data/schema/user';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectManagementSystemValidators } from 'src/app/validators/project-management-system-validators';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  user: User = new User();

  userId: number = 1;

  username: String = "luongpd";

  check: boolean = false;

  acountForm!: FormGroup;

  editOldPassword: String ="";
  editNewPassword: String ="";
  editConfirmPassword: String ="";

  checkPass: boolean = true;



  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.handleGetUser();

    this.acountForm = new FormGroup({
      fullName: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
        // ProjectManagementSystemValidators.notOnlyWhitespace
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      phone: new FormControl('',[
        // Validators.maxLength(11),
        // Validators.minLength(11),
        Validators.pattern('^(84|0[3|5|7|8|9])+([0-9]{8})$')]),

      address: new FormControl('',[
        Validators.maxLength(200)]),

      currentPassword: new FormControl('',[
        //Validators.minLength(8),
        Validators.maxLength(50),
        //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]),
      newPassword: new FormControl('',[
        //Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      confirmPassword: new FormControl('',[
        //Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
    });
  }





  handleGetUser() {
<<<<<<< HEAD
    this.userService.getUser(this.jwt.getUsername()).subscribe(   //this.jwt.getUsername()    this.username
=======
    this.userService.getUser(this.username).subscribe(
>>>>>>> parent of 5423951f (update)
      data => {
        this.user = data;
        console.log(data);
      }
    )
  }

  checkEdit(){
    if(this.check == false){
      this.check = true;
    }else{
      this.check = false;
      this.editOldPassword ="";
      this.editNewPassword ="";
      this.editConfirmPassword ="";
    }
    console.log(this.check);
  }


  update(){
    console.log("update");

    const userUpdate = this.user;


    // if (this.acountForm.invalid) {
    //   //this.acountForm.markAllAsTouched();
    //   console.log("false " + this.acountForm.status)
    //   return;
    // }

    userUpdate.fullName = this.acountForm.controls['fullName'].value;
    userUpdate.email = this.acountForm.controls['email'].value;
    userUpdate.phone = this.acountForm.controls['phone'].value;
    userUpdate.address = this.acountForm.controls['address'].value;
    userUpdate.password = this.acountForm.controls['currentPassword'].value;
    userUpdate.newPassword = this.acountForm.controls['newPassword'].value;

    console.log("true " + this.acountForm.status)

    console.log( userUpdate.newPassword +" " + this.acountForm.controls['confirmPassword'].value);

    if(this.check===true && userUpdate.newPassword != this.acountForm.controls['confirmPassword'].value) {
      console.log("false pass compare" );
      this.checkPass = false;
      return;
    }

    console.log(JSON.stringify(userUpdate))
    this.userService.updateUser(userUpdate).subscribe(
      data => {
        console.log(data);
    }, error =>{
        console.log(error);
    });

  }


  get fullName() { return this.acountForm.get('fullName');}
  get email() { return this.acountForm.get('email');}
  get phone() { return this.acountForm.get('phone');}
  get address() { return this.acountForm.get('address');}
  get currentPassword() { return this.acountForm.get('currentPassword');}
  get newPassword() { return this.acountForm.get('newPassword');}
  get confirmPassword() { return this.acountForm.get('confirmPassword');}
}
