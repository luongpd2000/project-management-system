import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from 'src/app/data/schema/todo';
import { TodoHistory } from 'src/app/data/schema/todo-history';
import { StatusService } from 'src/app/data/service/status.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { TodoService } from 'src/app/service/todo.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/data/schema/user';
import { FomatInputService } from '../../../../data/service/fomat-input.service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  @Input() curTaskId:number;
  @Input() curProjectId:number;
  //form nay cho admin, leader
  todoForm!: FormGroup;
  todoList: Todo[]=[];
  todoListAll: Todo[]=[];
  userId: number;
  todoDetail: Todo;
  todoHistory: TodoHistory[]=[];
  statusUpdate: String ="";
  select: boolean = false;
  updateTodoStatus: TodoHistory = new TodoHistory();
  // update chi danh cho employee
  updateform: FormGroup;
  memberList:User[]=[];
  employeeList:User[]=[];
  // leaderList:User[]=[];
  myAccount:User;
  curTodo:Todo;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  dataSource!: MatTableDataSource<Todo>;
  displayedColumns: string[] = [
    'STT',
    'ID',
    'Name',
    'Created Date',
    'Start Date',
    'Status',
    'Task Id',
    'Todo Type',
    'Action',
  ];

  selection = new SelectionModel<Todo>(true, []);


  constructor(private route: ActivatedRoute,
    private modalService: NgbModal,
    private jwt: JwtServiceService,
    private router: Router,
    private todoService: TodoService,
    private userService: UserService,
    public getStatus:StatusService,
    public fomatInput:FomatInputService) { }

  ngOnInit(): void {

    this.getData();
    this.getAllData();

    this.userService.getUser(this.jwt.getUsername()).subscribe(data=>{
      this.myAccount = data;
    })
    this.getMembers();

    this.updateform = new FormGroup({
      des: new FormControl(''),
    });

  }

  getData(){
    this.todoService.getTodoListByTask(this.curTaskId,this.thePageNumber-1,this.thePageSize).subscribe(
      data=>{
        this.todoList = data['content'];
        console.log(this.todoList)
        this.dataSource = new MatTableDataSource<Todo>(this.todoList);
        this.thePageNumber = data.pageable.pageNumber + 1;
        this.thePageSize = data.pageable.pageSize;
        this.theTotalElements = data.totalElements;
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  getAllData(){
    this.todoService.getTodoListByTasNoPageable(this.curTaskId).subscribe(
      data=>{
        this.todoListAll = data;
        console.log(this.todoListAll);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
  getMembers(){
    this.userService.getUsersInProject(this.curProjectId).subscribe(data=>{

      
      let members:any[]=data['content'];
      members.forEach(element => {
        this.memberList.push(element.user);
        if(element.role!="leader") this.employeeList.push(element.user);
      });
      
      console.log(this.memberList, this.employeeList);
      
      // this.memberList.forEach(data=>{
      //   if(data.role=="leader") this.leaderList.push(data.user);
      // });
      // console.log('leader',this.leaderList);

    });
  }

  openNew(content){
    this.makeNewForm();
    this.modalService.open(content,{
      centered: true,
      size: 'lg',
    })
  }

  makeNewForm(){
    this.todoForm = new FormGroup({
      "name":new FormControl(null,[Validators.required]),
      "des":new FormControl("description",[Validators.required]),
      "priority":new FormControl('high',[Validators.required]),
      "startDate":new FormControl(null,[Validators.required]),
      "endDate":new FormControl(null,[Validators.required]),
      "status":new FormControl('draft',[Validators.required]),
      "taskType":new FormControl('feature',[Validators.required]),
      "assignfor":new FormControl([Validators.required])
    })
  }

  // saveNewTodo(){
  //   if(this.todoForm.valid){
  //     this.curTodo.name=this.todoForm.value.name;
  //     this.curTodo.des=this.formTask.value.des;
  //     this.curTodo.startDate =this.fomatInput.fomatDate(this.formTask.value.startDate);
  //     this.curTodo.endDate = this.fomatInput.fomatDate(this.formTask.value.endDate);
  //     this.curTodo.status=this.formTask.value.status;
  //     this.curTodo.priority=this.formTask.value.priority;
  //     this.curTodo.taskType=this.formTask.value.taskType;
  //     this.curTodo.taskManagerId=this.formTask.value.manager;
  //     //
  //     console.log('click save!!');
  //     console.log(JSON.stringify(this.curTodo));
  //     this.taskService.updateTask(this.curTodo).subscribe(data=>{
  //       console.log('update',data);
  //       alert("Edit Success");
  //       this.modalService.dismissAll();
  //       this.getTaskDetails();
  //     })
      
  //   }else{
  //     alert("Input invalid!!!")
  //   }
  // }


  openDetails(content: any, element){
    this.todoDetail = element;
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
    });
  }

  openHistory(content: any, element){
    this.todoHistory = element.todoHistoryList;
    console.log(element);
    console.log(this.todoHistory);
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
    });
  }

  openUpdate(content: any, element){
    this.select = false;
    this.todoDetail = element;
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
    });
  }

  selectStatus(event){
    this.select = true;
    this.statusUpdate = event.target.value;
    console.log(this.statusUpdate)
    console.log(event.target.value)
  }

  updateStatus(){
    console.log(this.statusUpdate)
    this.updateTodoStatus.preStatus = this.todoDetail.status;
    this.updateTodoStatus.todoId = this.todoDetail.id;
    this.updateTodoStatus.updateUser = this.todoDetail.assignedUser;
    this.updateTodoStatus.des = this.updateform.controls['des'].value;
    this.updateTodoStatus.status = this.statusUpdate;
    this.todoDetail.todoHistoryList.push(this.updateTodoStatus);
    this.todoDetail.status = this.statusUpdate;
    console.log(this.updateTodoStatus);

    this.todoService.insertHistory(this.updateTodoStatus).subscribe(
      data=>{
        console.log(data);
        this.modalService.dismissAll();
      },
      (error) => {
        console.log(error.error.message);
      }
    )

    this.todoService.updateStatus(this.todoDetail).subscribe(
      data=>{
        console.log(data);
        this.modalService.dismissAll();
        this.getData();
        this.getAllData();
        window.alert("update status success")
      },
      (error) => {
        console.log(error.error.message);
        window.alert("update status false")
      }
    )
  }
// 
  updatePageSize(event) {
    this.thePageSize = event.target.value;
    console.log(this.thePageSize)
    this.thePageNumber = 1;
    this.getData();

  }

  saveNewTodo(){
    console.log(this.todoForm.value);
    this.modalService.dismissAll();
    
  }

  applyFilter(filterValue: string) {
    if(filterValue.trim()!==""){
      this.dataSource = new MatTableDataSource<Todo>(this.todoListAll);
    }else{
      this.dataSource = new MatTableDataSource<Todo>(this.todoList);
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  get name(){
    return this.todoForm.get('name');
  }
  get des(){
    return this.todoForm.get('des');
  }
  get priority(){
    return this.todoForm.get('priority')
  }
  get startDate(){
    return this.todoForm.get('startDate');
  }
  get endDate(){
    return this.todoForm.get('endDate');
  }
  get status(){
    return this.todoForm.get('status');
  }
  get manager(){
    return this.todoForm.get('manager');
  }
}
