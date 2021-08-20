import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordRecover } from 'src/app/data/schema/password-recover';
import { User } from 'src/app/data/schema/user';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  userList: User[]=[];
  newUser: User = new User();
  formProject!: FormGroup;
  checkAdd: boolean = true;
  userDetails: User = new User();
  index: number;
  statusDelete: boolean = false;
  userForm!: FormGroup;
  checkPass: boolean = true;
  checkPassRecover: boolean = true;
  pr: PasswordRecover = new PasswordRecover();
  passwordReset: String;
  isPasswordReset: boolean = false;


  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'STT',
    'ID',
    'UserName',
    'Full Name',
    'Email',
    'Phone',
    'Address',
    'Action',
  ];
  selection = new SelectionModel<User>(true, []);

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private jwt: JwtServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getData();

    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        // Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9]+$'),
        // ProjectManagementSystemValidators.notOnlyWhitespace
      ]),
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        // ProjectManagementSystemValidators.notOnlyWhitespace
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      phone: new FormControl('', [
        Validators.pattern('^(84|0[3|5|7|8|9])+([0-9]{8})$'),
      ]),
      address: new FormControl('', [Validators.maxLength(200)]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
    });
  }

  getData() {
    this.userService.getAllUsersPageable(this.thePageNumber-1,this.thePageSize).subscribe(
      (data) => {
        console.log(data);
        this.userList = data['content'];
        console.log(this.userList);
        this.statusDelete = false;
        this.dataSource = new MatTableDataSource<User>(this.userList);
        //this.userList = data._embedded.users;
        this.thePageNumber = data.pageable.pageNumber + 1;
        this.thePageSize = data.pageable.pageSize;
        this.theTotalElements = data.totalElements;
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }


  updatePageSize(event) {
    this.thePageSize = event.target.value;
    console.log(this.thePageSize)
    this.thePageNumber = 1;
    this.getData();
  }

  openDetails(content: any, element) {
    this.checkAdd = false;
    console.log(this.checkAdd);
    this.userDetails = element;
    console.log(this.userDetails);
    this.modalService.open(content, {
      centered: true,
    });
  }

  openAddUser(content: any) {
    this.checkAdd = true;
    console.log(this.checkAdd);
    this.modalService.open(content, {
      centered: true,
    });
  }

  createUser() {
    console.log('createUser');

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      console.log('false ' + this.userForm.status);
      return;
    }

    this.newUser.username = this.userForm.controls['username'].value;
    this.newUser.fullName = this.userForm.controls['fullName'].value;
    this.newUser.email = this.userForm.controls['email'].value;
    this.newUser.phone = this.userForm.controls['phone'].value;
    this.newUser.address = this.userForm.controls['address'].value;
    this.newUser.password = this.userForm.controls['password'].value;

    console.log('true ' + this.userForm.status);

    console.log(
      this.newUser.password +
        ' ' +
        this.userForm.controls['confirmPassword'].value
    );

    if (
      this.newUser.password != this.userForm.controls['confirmPassword'].value
    ) {
      console.log('false pass compare');
      this.checkPass = false;
      return;
    }

    this.userService.createUser(this.newUser).subscribe(
      (data) => {
        console.log(data);
        if (data != null) {
          this.modalService.dismissAll();
          window.alert('Update sucess');
          this.getData();
        } else {
          window.alert('Update failure: username already exist');
        }
      },
      (error) => {
        window.alert('Update failure');
        console.log(error);
      }
    );
  }


  openDelete(content: any, element) {
    this.userDetails = element;
    this.modalService.open(content, {
      centered: true,
    });
  }

  onDelete() {
    this.userService.deleteUser(this.userDetails.id).subscribe(
      (data) => {
        console.log(data);
        this.getData();
        this.modalService.dismissAll();
        this.statusDelete = true;
      },
      (error) => {
        console.log(error);
        this.statusDelete = false;
      }
    );
  }

  openpasswordRecover(content: any, element) {
    this.isPasswordReset = false;
    this.userDetails = element;
    this.modalService.open(content, {
      centered: true,
    });
  }

  passwordRecover() {
    console.log('passwordRecover');

    if (this.userForm.controls['email'].invalid) {
      this.userForm.controls['email'].markAsTouched();
      console.log('false ' + this.userForm.controls['email'].status);
      return;
    }
    console.log('ok');

    this.pr.id = this.userDetails.id;
    this.pr.email = this.userForm.controls['email'].value;
    this.userService.passwordRecover(this.pr).subscribe(
      (data) => {
        console.log(data + ' ' + data.status);
        this.passwordReset = data.status;
        if (this.passwordReset != 'Password Recover failure') {
          this.isPasswordReset = true;
        }
        // this.modalService.dismissAll();
      },
      (error) => {
        console.log(error);
        this.statusDelete = false;
      }
    );
  }



  applyFilter(filterValue: string) {
    if(filterValue.trim()!==""){
      this.userService.getAllUsers().subscribe(
        data=>{

        })
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  get username() {
    return this.userForm.get('username');
  }
  get fullName() {
    return this.userForm.get('fullName');
  }
  get email() {
    return this.userForm.get('email');
  }
  get phone() {
    return this.userForm.get('phone');
  }
  get address() {
    return this.userForm.get('address');
  }
  get password() {
    return this.userForm.get('password');
  }
  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }
}
