import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from 'src/app/data/schema/todo';
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
    private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUser(this.jwt.getUsername()).subscribe(
      data=>{
        this.userId = data.id;
      this.getData();
      this.getAllData();
      }
    )

  }

  getData(){
    this.todoService.getTodoListOfUser(this.userId,this.thePageNumber-1,this.thePageSize).subscribe(
      data=>{
        this.todoList = data['content'];
        console.log(this.todoList)
        this.dataSource = new MatTableDataSource<Todo>(this.todoList);
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
