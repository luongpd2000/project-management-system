import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/data/schema/user';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectManagementSystemValidators } from 'src/app/validators/project-management-system-validators';
import { error } from '@angular/compiler/src/util';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css'],
})
export class MyaccountComponent implements OnInit {
  user: User = new User();

  userId: number = 1;

  username: String = 'luongpd';

  check: boolean = false; // check change pass

  checkEditInfor: boolean = false; // check change Infor

  acountForm!: FormGroup;

  editOldPassword: String = '';
  editNewPassword: String = '';
  editConfirmPassword: String = '';

  checkPass: boolean = true;
  // checkUpdate: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private jwt: JwtServiceService
  ) {}

  ngOnInit(): void {
    this.handleGetUser();

    this.acountForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      phone: new FormControl('', [
        Validators.pattern('^(84|0[3|5|7|8|9])+([0-9]{8})$'),
      ]),

      address: new FormControl('', [Validators.maxLength(200)]),

      currentPassword: new FormControl(),
      newPassword: new FormControl(),
      confirmPassword: new FormControl(),
    });
  }

  handleGetUser() {
    this.userService.getUser(this.jwt.getUsername()).subscribe(
      (data) => {
        this.user = data;
        // console.log(data);
      }
    );
  }

  checkEdit() {
    if (this.check === false) {
      this.check = true;
      this.acountForm.controls['currentPassword'].setValidators([
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]);
      this.acountForm.controls['currentPassword'].updateValueAndValidity();
      this.acountForm.controls['newPassword'].setValidators([
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]);
      this.acountForm.controls['newPassword'].updateValueAndValidity();
      this.acountForm.controls['confirmPassword'].setValidators([
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]);
      this.acountForm.controls['confirmPassword'].updateValueAndValidity();
      // console.log(this.acountForm.controls['newPassword'].validator)
    } else {
      this.check = false;
      this.editOldPassword = '';
      this.editNewPassword = '';
      this.editConfirmPassword = '';
      this.acountForm.controls['currentPassword'].clearValidators();
      this.acountForm.controls['currentPassword'].updateValueAndValidity();
      this.acountForm.controls['newPassword'].clearValidators();
      this.acountForm.controls['newPassword'].updateValueAndValidity();
      this.acountForm.controls['confirmPassword'].clearValidators();
      this.acountForm.controls['confirmPassword'].updateValueAndValidity();
    }
    console.log(this.check);
  }

  checkEditAccount() {
    this.checkEditInfor = true;
  }

  update() {
    // console.log('update');
    const userUpdate = this.user;

    if (this.acountForm.invalid) {
      this.acountForm.markAllAsTouched();
      console.log('false ' + this.acountForm.status);
      return;
    }

    userUpdate.fullName = this.acountForm.controls['fullName'].value;
    userUpdate.email = this.acountForm.controls['email'].value;
    userUpdate.phone = this.acountForm.controls['phone'].value;
    userUpdate.address = this.acountForm.controls['address'].value;
    userUpdate.password = this.acountForm.controls['currentPassword'].value;
    userUpdate.newPassword = this.acountForm.controls['newPassword'].value;

    // console.log('true ' + this.acountForm.status);

    // console.log(
    //   userUpdate.newPassword +
    //     ' ' +
    //     this.acountForm.controls['confirmPassword'].value
    // );

    if (
      this.check === true &&
      userUpdate.newPassword !=
        this.acountForm.controls['confirmPassword'].value
    ) {
      // console.log('false pass compare');
      this.checkPass = false;
      return;
    }

    this.userService.updateUser(userUpdate).subscribe(
      (data) => {
        window.alert('Update sucess');
      },
      (error) => {
        window.alert('Update failure');
      }
    );
  }

  get fullName() {
    return this.acountForm.get('fullName');
  }
  get email() {
    return this.acountForm.get('email');
  }
  get phone() {
    return this.acountForm.get('phone');
  }
  get address() {
    return this.acountForm.get('address');
  }
  get currentPassword() {
    return this.acountForm.get('currentPassword');
  }
  get newPassword() {
    return this.acountForm.get('newPassword');
  }
  get confirmPassword() {
    return this.acountForm.get('confirmPassword');
  }
}
