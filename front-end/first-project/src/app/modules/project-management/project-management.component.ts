import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ProjectService } from '../../service/project.service';
import { ProjectComponent } from '../../dialog/project/project.component';
import { FormGroup, FormBuilder, Validator, FormControl, Validators } from '@angular/forms';
import{Project} from '../../data/schema/project';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// import {MatDatepickerModule} from '@angular/material/datepicker';



@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {
 
  projectList:Project[]=[];
  newProject:Project=new Project();
  formProject!:FormGroup;
  constructor(
    private projectService:ProjectService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    // this.formProject = this.formBuilder.group({
    //   name:[''],
    //   des:[''],
    //   startDate:[''],
    //   endDate:[''],
    //   status:['draft']
    // })
    this.makeForm();
    this.projectService.getAllProjects().subscribe(data=>{
      this.projectList=data['content'];
      console.log(this.projectList);
    },error=>{console.log(error.error.message)});
  }
  makeForm(){
    this.formProject = new FormGroup({
      "name":new FormControl(null,[Validators.required]),
      "des":new FormControl(null,[Validators.required]),
      "startDate":new FormControl(null,[Validators.required]),
      "endDate":new FormControl(null,[Validators.required]),
      "status":new FormControl('draft',[Validators.required])
    })
  }

  open(content: any){
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
    console.log(this.projectList.length);
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
      // this.ngOnInit();
  }
  // showNewProject(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width="60%";
  //   this.dialog.open(ProjectComponent);
  // }
  }


