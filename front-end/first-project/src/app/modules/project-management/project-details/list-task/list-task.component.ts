import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/data/schema/task';
import { StatusService } from 'src/app/data/service/status.service';
import { TaskService } from '../../../../service/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FomatInputService } from 'src/app/data/service/fomat-input.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/data/schema/user';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { TaskHistory } from 'src/app/data/schema/task-history';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  @Input() currentProjectId: number;
  @Input() memberList:any[];
  @Output() updateDetails = new EventEmitter();

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



  updateParent(){
    this.updateDetails.emit();
    console.log('update parents');
  }

  myUserName!:String;
  myUserId:number;
  deleteTask:Task;
  detailTask: Task= new Task;
  taskHisrotyList: TaskHistory[] = [];
  isAdmin: boolean = false;

  leaderList=[];
  taskList:Task[]=[];
  taskListAll:Task[]=[];
  formTask!:FormGroup;
  newTask=new Task();
  getLeaderList(){
    this.memberList.forEach(data=>{
      if(data.role=="leader") this.leaderList.push(data['user']);
    })
    console.log('member', this.memberList);
    console.log('leader', this.leaderList);
  }

  constructor(private taskService:TaskService,
    public getStatus:StatusService,
    private modalService: NgbModal,
    private fomatInput:FomatInputService,
    private jwt:JwtServiceService,
    private userService:UserService
    ) { }

  ngOnInit(): void {
    console.log(this.currentProjectId);
    this.getData();
    this.getLeaderList();

    this.myUserName = this.jwt.getUsername();

    if(this.myUserName!=null){
      if(this.myUserName==="admin"){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
      this.userService.getUser(this.myUserName).subscribe(data=>{
        this.myUserId=data.id;
      })
    }
    this.getDataAll();
  }

  getData(){
    this.taskService.getListTaskByProjectIdPageable(this.currentProjectId,this.thePageNumber-1,this.thePageSize).subscribe(
      data=>{
      this.taskList = data['content'];
      console.log(this.taskList);
      this.dataSource = new MatTableDataSource<Task>(this.taskList);
      this.thePageNumber = data.pageable.pageNumber + 1;
      this.thePageSize = data.pageable.pageSize;
      this.theTotalElements = data.totalElements;
    },
    (error) => {
      console.log(error.error.message);
    })
  }

  getDataAll(){
    this.taskService.getListTaskByProjectId(this.currentProjectId).subscribe(
      data=>{
      this.taskListAll = data;
      console.log(this.taskListAll);
    },
    (error) => {
      console.log(error.error.message);
    })
  }

  open(content: any){
    this.makeForm();
    this.modalService.open(content, {
      centered: true,
      size: 'lg'
    });
  }
  makeForm(){
    this.formTask = new FormGroup({
      "name":new FormControl(null,[Validators.required]),
      "des":new FormControl(null,[Validators.required]),
      "priority":new FormControl('high',[Validators.required]),
      "startDate":new FormControl(null,[Validators.required]),
      "endDate":new FormControl(null,[Validators.required]),
      "status":new FormControl('draft',[Validators.required]),
      "manager":new FormControl(this.myUserId,[Validators.required]),
      "taskType":new FormControl("feature", [Validators.required])
    })
  }



  saveNewTask(){
    if(this.formTask.valid){
      this.newTask.name=this.formTask.value.name;
      this.newTask.des=this.formTask.value.des;
      this.newTask.startDate =this.fomatInput.fomatDate(this.formTask.value.startDate);
      this.newTask.endDate = this.fomatInput.fomatDate(this.formTask.value.endDate);
      this.newTask.status=this.formTask.value.status;
      this.newTask.priority=this.formTask.value.priority;
      this.newTask.taskManagerId=this.formTask.value.manager;
      this.newTask.createUser=this.myUserId;
      this.newTask.taskType=this.formTask.value.taskType;
      this.newTask.projectId=this.currentProjectId;
      console.log('click save!!');
      console.log(JSON.stringify(this.newTask));
      this.taskService.createTask(this.newTask).subscribe(data=>{
        console.log('new',data);
        this.modalService.dismissAll();
        this.getData();
      })

    }else{
      alert("Input invalid!!!")
    }
  }

  openConfirmDelete(content: any, task:Task){
    this.deleteTask=task;
    this.modalService.open(content, {
      centered: true,
    });

  }
  onDelete(){
    console.log(this.deleteTask);
    this.taskService.deleteTask(this.deleteTask).subscribe(data=>{
      console.log(data);
      this.getData();
    })
    this.modalService.dismissAll();

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


  // use for Form
  get name(){
    return this.formTask.get('name');
  }
  get des(){
    return this.formTask.get('des');
  }
  get priority(){
    return this.formTask.get('priority')
  }
  get startDate(){
    return this.formTask.get('startDate');
  }
  get endDate(){
    return this.formTask.get('endDate');
  }
  get status(){
    return this.formTask.get('status');
  }
  get manager(){
    return this.formTask.get('manager');
  }

}
