import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from 'src/app/data/schema/todo';
import { TodoHistory } from 'src/app/data/schema/todo-history';
import { StatusService } from 'src/app/data/service/status.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { TodoService } from 'src/app/service/todo.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-todo',
  templateUrl: './my-todo.component.html',
  styleUrls: ['./my-todo.component.css']
})
export class MyTodoComponent implements OnInit {

  todoForm!: FormGroup;
  todoList: Todo[]=[];
  todoListAll: Todo[]=[];
  userId: number;
  todoDetail: Todo;
  todoHistory: TodoHistory[]=[];
  statusUpdate: String ="";
  select: boolean = false;
  updateTodoStatus: TodoHistory = new TodoHistory();
  updateform: FormGroup;


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
    'Project Id',
    'Todo Type',
    'Priority',
    'Action',
  ];

  selection = new SelectionModel<Todo>(true, []);

  constructor(private route: ActivatedRoute,
    private modalService: NgbModal,
    private jwt: JwtServiceService,
    private router: Router,
    private todoService: TodoService,
    private userService: UserService,
    public getStatus:StatusService) { }

  ngOnInit(): void {

    this.userService.getUser(this.jwt.getUsername()).subscribe(
      data=>{
        this.userId = data.id;
      this.getData();
      this.getAllData();
      }
    )

    this.updateform = new FormGroup({
      des: new FormControl(''),
    });

  }

  getData(){
    this.todoService.getTodoListOfUser(this.userId,this.thePageNumber-1,this.thePageSize).subscribe(
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
    this.todoService.getTodoListOfUserNoPageable(this.userId).subscribe(
      data=>{
        this.todoListAll = data;
        console.log(this.todoListAll);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

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

  updatePageSize(event) {
    this.thePageSize = event.target.value;
    console.log(this.thePageSize)
    this.thePageNumber = 1;
    this.getData();

  }

  applyFilter(filterValue: string) {
    if(filterValue.trim()!==""){
      this.dataSource = new MatTableDataSource<Todo>(this.todoListAll);
    }else{
      this.dataSource = new MatTableDataSource<Todo>(this.todoList);
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
