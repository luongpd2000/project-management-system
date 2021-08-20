import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project.service';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import{Project} from '../../data/schema/project';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ProjectDetails } from '../../data/schema/project-details';
import { StatusService } from '../../data/service/status.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtServiceService } from '../../service/jwt-service.service';




@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {



  projectList:ProjectDetails[]=[];
  newProject:Project=new Project();//
  formProject!:FormGroup;
  constructor(
    private projectService:ProjectService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private jwt:JwtServiceService,
    public getStatus:StatusService) {
      console.log('user la: ', jwt.getUsername());
      
    }

  ngOnInit(): void {
    this.makeForm();
    this.projectService.getAllProjects().subscribe(data=>{
      this.projectList=data['content'];
      this.projectList.forEach(data=>{
        let tasks:Array<any> = <Array<any>>data.taskList;
        let partners:Array<any> = <Array<any>>data.projectEmployeeList;
        let todo=0;
        data.taskNum=tasks.length;
        tasks.forEach(element => {
          todo+=(element['todoList']).length;
        });
        data.partnerNum = partners.filter(function(item){
          return !item.delete;
        }).length;
        console.log(data.partnerNum);
        data.todoNum=todo;
      });
      console.log(this.projectList);
    },error=>{console.log(error.error.message)});
  }
  date = new Date();
  makeForm(){
    this.formProject = new FormGroup({
      "name":new FormControl('',[Validators.required]),
      "des":new FormControl(null,[Validators.required]),
      "startDate":new FormControl(null,[Validators.required]),
      "endDate":new FormControl(null,[Validators.required]),
      "status":new FormControl('draft',[Validators.required])
    })
  }

  open(content: any){
    this.makeForm();
    this.modalService.open(content, {
      centered: true,
      size: 'lg'
    });
  }

  close(){

  }

  fomatDate(date:any): string{
    let rs='';
    let year = date.year;
    let month:String = new String(date.month);
    if(month.length==1) month = '0'+month;
    let day:String = new String(date.day);
    if(day.length==1) day = '0'+day;
    return year+'-'+month+'-'+day;
  }
  saveProject(){
    if(this.formProject.valid){
      console.log("click save!!!");
      this.newProject.name=this.formProject.value.name;
      this.newProject.des=this.formProject.value.des;
      this.newProject.startDate =this.fomatDate(this.formProject.value.startDate);
      this.newProject.endDate = this.fomatDate(this.formProject.value.endDate);
      this.newProject.status=this.formProject.value.status;
      console.log(this.fomatDate(this.newProject.startDate),this.fomatDate( this.formProject.value.endDate));
      this.projectService.postProject(this.newProject).subscribe(data=>{
        this.projectService.getAllProjects().subscribe(data=>{
          this.projectList=data['content'];
          console.log(this.projectList.length);
        },error=>{console.log(error.error.message)});
      });
      this.modalService.dismissAll();
      this.makeForm();
    }else{
      alert("DATA INVALID")
    }
  }
  get name(){
    return this.formProject.get('name');
  }
  get des(){
    return this.formProject.get('des');
  }
  get startDate(){
    return this.formProject.get('startDate');
  }
  get endDate(){
    return this.formProject.get('endDate');
  }
  get status(){
    return this.formProject.get('status');
  }



  }


