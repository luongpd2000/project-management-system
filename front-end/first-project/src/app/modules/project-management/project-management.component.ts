import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project.service';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Project } from '../../data/schema/project';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProjectDetails } from '../../data/schema/project-details';
import { StatusService } from '../../data/service/status.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/data/schema/user';
import { LoginService } from 'src/app/service/login.service';
import { idRole } from 'src/app/data/schema/id-role';
import { FomatInputService } from 'src/app/data/service/fomat-input.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
})
export class ProjectManagementComponent implements OnInit {
  projectList: ProjectDetails[] = [];
  newProject: Project = new Project(); //
  formProject!: FormGroup;
  username!: String;
  userId!: number;
  user: User = new User();
  role!: String;
  isAdmin: boolean = true;
  project: Project = new Project();
  arrPE: idRole[] = new Array();
  admin: User = new User();
  public filter: any = '';

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public getStatus: StatusService,
    private jwtService: JwtServiceService,
    private userService: UserService,
    private loginService: LoginService,
    public fomat:FomatInputService
  ) { }

  ngOnInit(): void {
    if (!this.loginService.logIn) {
      this.projectList = null;
    }

    this.makeForm();

    this.role = this.jwtService.getRole();

    if (this.role === '[ROLE_ADMIN]') {
      this.getDetails();

      // this.projectService.getAllProjects().subscribe(
      //   (data) => {
      //     this.projectList = data['content'];
      //     this.projectList.forEach((data) => {
      //       let tasks: Array<any> = <Array<any>>data.taskList;
      //       let partners: Array<any> = <Array<any>>data.projectEmployeeList;
      //       let todo = 0;
      //       data.taskNum = tasks.length;
      //       tasks.forEach((element) => {
      //         todo += element['todoList'].length;
      //       });
      //       data.partnerNum = partners.filter(function (item) {
      //         return !item.delete;
      //       }).length;
      //       console.log(data.partnerNum);
      //       data.todoNum = todo;
      //     });
      //     console.log(this.projectList);
      //   },
      //   (error) => {
      //     console.log(error.error.message);
      //   }
      // );

    } else {
      this.isAdmin = false;
      this.username = this.jwtService.getUsername();

      this.userService.getUser(this.username).subscribe((data) => {
        this.user = data;
        console.log(data);
        this.userId = this.user.id;

        this.projectService.getListProjectOfUser(this.userId).subscribe(
          (data) => {
            this.projectList = data;
            console.log(this.projectList);
            this.projectList.forEach((data) => {
              let tasks: Array<any> = <Array<any>>data.taskList;
              let partners: Array<any> = <Array<any>>data.projectEmployeeList;
              let todo = 0;
              data.taskNum = tasks.length;
              tasks.forEach((element) => {
                todo += element['todoList'].length;
              });
              data.partnerNum = partners.filter(function (item) {
                return !item.delete;
              }).length;
              console.log(data.partnerNum);
              data.todoNum = todo;
            });
            console.log(this.projectList);
          },
          (error) => {
            console.log(error.error.message);
          }
        );
      });
    }
  }

  date = new Date();
  getDetails() {
    this.projectService.getAllProjects().subscribe(
      (data) => {
        this.projectList = data['content'];
        this.projectList.forEach((data) => {
          let tasks: Array<any> = <Array<any>>data.taskList;
          let partners: Array<any> = <Array<any>>data.projectEmployeeList;
          let todo = 0;
          data.taskNum = tasks.length;
          tasks.forEach((element) => {
            todo += element['todoList'].length;
          });
          data.partnerNum = partners.filter(function (item) {
            return !item.delete;
          }).length;
          console.log(data.partnerNum);
          data.todoNum = todo;
        });
        console.log(this.projectList);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
  makeForm() {
    this.formProject = new FormGroup({
      name: new FormControl('', [Validators.required]),
      des: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      status: new FormControl('draft', [Validators.required]),
    });
  }

  open(content: any) {
    this.makeForm();
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
    });
  }

  close() { }

  fomatDate(date: any): string {
    let rs = '';
    let year = date.year;
    let month: String = new String(date.month);
    if (month.length == 1) month = '0' + month;
    let day: String = new String(date.day);
    if (day.length == 1) day = '0' + day;
    return year + '-' + month + '-' + day;
  }
  saveProject() {
    if (this.formProject.valid) {
      console.log('click save!!!');
      this.newProject.name = this.formProject.value.name;
      this.newProject.des = this.formProject.value.des;
      this.newProject.startDate = this.fomatDate(
        this.formProject.value.startDate
      );
      this.newProject.endDate = this.fomatDate(this.formProject.value.endDate);
      this.newProject.status = this.formProject.value.status;

      console.log(
        this.fomatDate(this.newProject.startDate),
        this.fomatDate(this.formProject.value.endDate)
      );

      this.projectService.postProject(this.newProject).subscribe((data) => {
        this.project = data;
        console.log(data);
        console.log(this.project);
        console.log(this.user);
        this.addAmin();
        this.getDetails();

        // this.projectService.getAllProjects().subscribe(
        //   (data) => {
        //     this.projectList = data['content'];
        //     console.log(this.projectList.length);
        //   },
        //   (error) => {
        //     console.log(error.error.message);
        //   }
        // );
      });

      this.modalService.dismissAll();
      this.makeForm();
    } else {
      alert('DATA INVALID');
    }
  }

  addAmin() {
    this.userService.getUser(this.jwtService.getUsername()).subscribe(
      (data) => {
        this.admin = data;
        console.log(data)
        this.arrPE.push({
          user: this.admin,
          role: 'admin',
          projectId: this.project.id,
        });
        console.log(this.arrPE);
        this.projectService.postRole(this.arrPE).subscribe(
          (data) => {
            console.log(data + 'add success');
          },
          (error) => {
            console.log(error.error.message);
          }
        );
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  get name() {
    return this.formProject.get('name');
  }
  get des() {
    return this.formProject.get('des');
  }
  get startDate() {
    return this.formProject.get('startDate');
  }
  get endDate() {
    return this.formProject.get('endDate');
  }
  get status() {
    return this.formProject.get('status');
  }
}
