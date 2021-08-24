import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectDetails } from 'src/app/data/schema/project-details';
import { ProjectService } from '../../../service/project.service';
import { DatePicker } from 'src/app/data/schema/date-picker';
import { FomatInputService } from 'src/app/data/service/fomat-input.service';
import { StatusService } from 'src/app/data/service/status.service';

import { JwtServiceService } from 'src/app/service/jwt-service.service';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})


export class ProjectDetailsComponent implements OnInit {
  private id: number = 0;
  formProject!: FormGroup;
  currentProject!: ProjectDetails;
  taskList = [];
  taskNum = 0;
  todoNum = 0;

  currentProjectId: number;
  memberList: any[] = [];

  isAdmin: boolean = true;
  role!: String;


  alert: boolean = false;
  closeAlert() {
    this.alert = false;
  }

  constructor(private route: ActivatedRoute,
    private projectService: ProjectService,
    private modalService: NgbModal,
    public fomat: FomatInputService,
    private router: Router,
    public getStatus: StatusService,
    private jwtService: JwtServiceService,

  ) { }

  ngOnInit(): void {
    this.role = this.jwtService.getRole();
    if (this.role === '[ROLE_USER]') {
      this.isAdmin = false;
    }
    this.loadDetails();
  }

  loadDetails() {
    this.id = this.route.snapshot.params['id'];
    console.log("You clicked: " + this.id);
    this.projectService.getProjectById(this.id).subscribe(data => {
      this.currentProject = data;
      this.taskList = this.currentProject.taskList;
      console.log('todo');
      this.todoNum = 0;
      this.taskList.forEach(task => {
        this.todoNum += (<Array<any>>task['todoList']).length;
        if (task.deleted == false) this.taskNum++;
      })
      console.log(this.todoNum);
      this.currentProject.partnerNum = this.currentProject.projectEmployeeList.filter(item => {
        return !item.delete;
      }).length;
      this.currentProjectId = this.currentProject.id;
      this.memberList = this.currentProject.projectEmployeeList;
    })
  }
  // open project Form
  openProjectForm(content: any) {
    this.makeEditProjectForm();
    this.modalService.open(content, {
      centered: true,
      size: 'lg'
    });
  }

  makeEditProjectForm() {
    this.formProject = new FormGroup({
      "name": new FormControl(this.currentProject.name, [Validators.required]),
      "des": new FormControl(this.currentProject.des, [Validators.required]),
      "startDate": new FormControl(this.fomat.toDatePicker(this.currentProject.startDate), [Validators.required]),
      "endDate": new FormControl(this.fomat.toDatePicker(this.currentProject.endDate), [Validators.required]),
      "status": new FormControl(this.currentProject.status, [Validators.required])
    })
    console.log('start date:', this.currentProject.startDate);
    console.log('end date:', this.currentProject.endDate);
    
  }

  saveProject() {
    if (this.formProject.valid) {
      console.log("click save!!!");
      this.currentProject.name = this.formProject.value.name;
      this.currentProject.des = this.formProject.value.des;
      this.currentProject.startDate = this.fomat.fomatDate(this.formProject.value.startDate);
      this.currentProject.endDate = this.fomat.fomatDate(this.formProject.value.endDate);
      this.currentProject.status = this.formProject.value.status;
      this.projectService.putProject(this.currentProject).subscribe(data => {
        this.projectService.getAllProjects().subscribe(data => {
          this.currentProject = data['content'];
          this.loadDetails();
          this.alert = true;
        }, error => { console.log(error.error.message) });
      });
      this.modalService.dismissAll();
    } else {
      alert("DATA INVALID")
    }
  }

  openDelete(content: any) {
    this.modalService.open(content, {
      centered: true,
    });
  }

  onDelete() {
    this.projectService.deleteProject(this.currentProject.id).subscribe(data => {
      console.log(data);
      this.modalService.dismissAll();
      this.router.navigateByUrl('/project-manager');
    }, error => { console.log(error.error.message) });
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
