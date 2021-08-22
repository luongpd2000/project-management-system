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

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  dataSource!: MatTableDataSource<Task>;
  displayedColumns: string[] = [
    'No.',
    'ID',
    'Name',
    'Priority',
    'Type',
    'Manager',
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
    private userService:UserService) {

  }

  ngOnInit(): void {

    this.getUser();
  }

  getUser(){
    this.userService.getUser(this.jwt.getUsername()).subscribe(
      data=>{
        this.user = data;
        this.userId = this.user.id;
        this.getData();
        this.getDataAll();
      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  getData(){
    this.taskService.getTaskByUserPageable(this.userId,this.thePageNumber-1,this.thePageSize).subscribe(
      data=>{
        this.taskList = data['content']
        console.log(this.taskList);
        this.dataSource = new MatTableDataSource<Task>(this.taskList);
        this.thePageNumber = data.pageable.pageNumber + 1;
        this.thePageSize = data.pageable.pageSize;
        this.theTotalElements = data.totalElements;
      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  getDataAll(){
    this.taskService.getTaskByUser(this.userId).subscribe(
      data=>{
      this.taskListAll = data;
      console.log(this.taskListAll);
    },
    (error) => {
      console.log(error.error.message);
    })
  }

  openHistory(content: any, element){
    this.detailTask = element;
    console.log(this.detailTask);
    this.taskHisrotyList = this.detailTask.taskHistoryList;
    console.log(this.taskHisrotyList);
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
    });
  }

  updatePageSize(event) {
    this.thePageSize = event.target.value;
    console.log(this.thePageSize)
    this.thePageNumber = 1;
    this.getData();

  }

  applyFilter(filterValue: string) {
    if(filterValue.trim()!=="" || filterValue.trim()!==null){
      this.dataSource = new MatTableDataSource<Task>(this.taskListAll);
    }else{
      this.dataSource = new MatTableDataSource<Task>(this.taskList);
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
