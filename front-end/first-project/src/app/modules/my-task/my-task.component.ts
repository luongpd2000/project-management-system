import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/data/schema/task';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { StatusService } from 'src/app/data/service/status.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FomatInputService } from 'src/app/data/service/fomat-input.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { UserService } from 'src/app/service/user.service';
import { TaskHistory } from 'src/app/data/schema/task-history';
import { User } from 'src/app/data/schema/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {

  taskList: Task[]=[];
  taskListAll: Task[]=[];
  taskHisrotyList: TaskHistory[] = [];
  detailTask: Task= new Task;
  user: User = new User();
  userId: number;
  deleteTask: Task = new Task();

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  formSearch:FormGroup;
  isSearchAll = true;
  name: String;
  status: String;
  priority: String;
  type: String;
  projectId: number;
  startDate: String;
  endDate: String;

  makeSearchForm(){
    this.formSearch = this.formBuilder.group({
      name:[''],
      status:[''],
      priority:[''],
      type:[''],
      projectId:[''],
      startDate:[''],
      endDate:['']
    });
  }

  dataSource!: MatTableDataSource<Task>;
  displayedColumns: string[] = [
    'No.',
    'ID',
    'Name',
    'Priority',
    'Type',
    'ProjectId',
    'StartDate',
    'Due to',
    'Status',
    'Action',
  ];

  selection = new SelectionModel<Task>(true, []);

  constructor(private taskService:TaskService,
    public getStatus:StatusService,
    private modalService: NgbModal,
    private fomatInput:FomatInputService,
    private jwt:JwtServiceService,
    private userService:UserService,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe) {

  }

  ngOnInit(): void {

    this.getUser();
    this.makeSearchForm();
  }

  getUser(){
    this.userService.getUser(this.jwt.getUsername()).subscribe(
      data=>{
        this.user = data;
        this.userId = this.user.id;
        this.getData();
      },
      (error) => {
        // console.log(error.error.message);
      }
    )
  }

  getData(){

    if(this.isSearchAll){
      this.taskService.getTaskByUserPageable(this.userId,this.thePageNumber-1,this.thePageSize).subscribe(
        data=>{
          this.taskList = data['content']
          // console.log(this.taskList);
          this.dataSource = new MatTableDataSource<Task>(this.taskList);
          this.thePageNumber = data.pageable.pageNumber + 1;
          this.thePageSize = data.pageable.pageSize;
          this.theTotalElements = data.totalElements;
        },
        (error) => {
          // console.log(error.error.message);
        }
      )
    }else{
      this.onSearch();
    }


  }


  onSearch(){
    this.isSearchAll = false;

    this.name = this.formSearch.value.name;
    this.status = this.formSearch.value.status;
    this.startDate = this.datepipe.transform(this.formSearch.value.startDate,'yyyy-MM-dd');
    this.startDate=this.startDate==null?'':this.startDate;
    this.endDate = this.datepipe.transform(this.formSearch.value.endDate,'yyyy-MM-dd');
    this.endDate = this.endDate==null?'':this.endDate;
    this.priority = this.formSearch.value.priority;
    this.type=this.formSearch.value.type;
    this.projectId=this.formSearch.value.projectId;



    this.taskService.searchTask(this.name , this.status, this.priority, this.type, this.userId,
       this.startDate, this.endDate, this.projectId,this.thePageNumber - 1, this.thePageSize)
       .subscribe(data=>{
        this.taskList = data['content'];
        this.dataSource = new MatTableDataSource<Task>(this.taskList);
        this.thePageNumber = data.pageable.pageNumber + 1;
        this.thePageSize = data.pageable.pageSize;
        this.theTotalElements = data.totalElements;
       })

  }


  openHistory(content: any, element){
    this.detailTask = element;
    // console.log(this.detailTask);
    this.taskHisrotyList = this.detailTask.taskHistoryList;
    // console.log(this.taskHisrotyList);
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
    });
  }

  openConfirmDelete(content: any, task: Task) {
    this.deleteTask = task;
    this.modalService.open(content, {
      centered: true,
    });
  }

  getAllTask(){
    this.isSearchAll = true;
    this.getData();
    this.makeSearchForm();
  }

  onDelete() {
    // console.log(this.deleteTask);
    this.taskService.deleteTask(this.deleteTask).subscribe((data) => {
      // console.log(data);
      this.getData();
    });
    this.modalService.dismissAll();
  }


  updatePageSize(event) {
    this.thePageSize = event.target.value;
    console.log(this.thePageSize)
    this.thePageNumber = 1;
    this.getData();

  }



}
