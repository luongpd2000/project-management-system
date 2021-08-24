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
import { ProjectEmployee } from 'src/app/data/schema/project-employee';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css'],
})
export class ListTodoComponent implements OnInit {
  @Input() curTaskId: number;
  @Input() curProjectId: number;
  @Input() isLeader: boolean;
  @Input() isAdmin: boolean;
  @Input() curUserId: number;

  //form nay cho admin, leader
  todoForm!: FormGroup;
  todoList: Todo[] = [];
  todoListAll: Todo[] = [];
  userId: number;
  todoDetail: Todo;
  todoHistory: TodoHistory[] = [];
  statusUpdate: String = '';
  select: boolean = false;
  updateTodoStatus: TodoHistory = new TodoHistory();
  idDelete: number;
  // update chi danh cho employee
  updateform: FormGroup;
  memberList: ProjectEmployee[] = [];
  employeeList: User[] = [];
  leaderList: User[] = [];
  isEmployeeOfTodo: boolean = false;
  // isLeader: boolean;;

  myAccount: User;
  curTodo: Todo = new Todo();

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
    // 'Assigned for',
    'Todo Type',
    'Action',
  ];

  selection = new SelectionModel<Todo>(true, []);

  getMembers() {
    this.userService.getUsersInProject(this.curProjectId).subscribe((data) => {
      this.memberList = data['content'];
      this.memberList.forEach((data) => {
        if (data.role === 'leader') {
          this.leaderList.push(data.user);
        } else if (data.role === 'dev') {
          this.employeeList.push(data.user);
        }
      });
      console.log('leader', this.leaderList);
      console.log('dev', this.employeeList);
    });
  }

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private jwt: JwtServiceService,
    private router: Router,
    private todoService: TodoService,
    private userService: UserService,
    public getStatus: StatusService,
    public fomatInput: FomatInputService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getAllData();

    console.log(this.curUserId);
    this.userService.getUser(this.jwt.getUsername()).subscribe(
      data=>{
        this.myAccount = data;
      }
    )
    this.getMembers();
    this.updateform = new FormGroup({
      des: new FormControl(''),
    });
  }

  getData() {
    this.todoService
      .getTodoListByTask(
        this.curTaskId,
        this.thePageNumber - 1,
        this.thePageSize
      )
      .subscribe(
        (data) => {
          this.todoList = data['content'];
          this.todoList.forEach(data=>{
            this.userService.getUserById(data.assignedUser).subscribe(item=>{
                data.assignedUserDetails=item;
            })
          })
          console.log(this.todoList);
          console.log(this.todoList[0]);
          // if(this.todoList[0].assignedUser===this.curUserId){
          //   this.isLeader = true;
          // }else{
          //   this.isLeader = false;
          // }
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

  getAllData() {
    this.todoService.getTodoListByTasNoPageable(this.curTaskId).subscribe(
      (data) => {
        this.todoListAll = data;
        console.log(this.todoListAll);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  openModal(content) {
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
    });
  }

  openNew(content) {
    this.makeNewForm();
    this.openModal(content);
  }

  makeNewForm() {
    this.todoForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      des: new FormControl('description', [Validators.required]),
      // "priority":new FormControl('high',[Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      status: new FormControl('draft', [Validators.required]),
      todoType: new FormControl('feature', [Validators.required]),
      assignfor: new FormControl(this.myAccount.id, [Validators.required]),
    });
  }
  makeUpdateForm() {
    this.todoForm = new FormGroup({
      name: new FormControl(this.todoDetail.name, [Validators.required]),
      des: new FormControl(this.todoDetail.des, [Validators.required]),
      // "priority":new FormControl(this.curTodo.priority,[Validators.required]),
      startDate: new FormControl(
        this.fomatInput.toDatePicker(this.todoDetail.startDate),
        [Validators.required]
      ),
      endDate: new FormControl(
        this.fomatInput.toDatePicker(this.todoDetail.endDate),
        [Validators.required]
      ),
      status: new FormControl(this.todoDetail.status, [Validators.required]),
      todoType: new FormControl(this.todoDetail.todoType, [Validators.required]),
      assignfor: new FormControl(this.todoDetail.assignedUser, [
        Validators.required,
      ]),
    });
  }
  saveNewTodo() {
    if (this.todoForm.valid) {
      this.curTodo.name = this.todoForm.value.name;
      this.curTodo.des = this.todoForm.value.des;
      this.curTodo.startDate = this.fomatInput.fomatDate(
        this.todoForm.value.startDate
      );
      this.curTodo.endDate = this.fomatInput.fomatDate(
        this.todoForm.value.endDate
      );
      this.curTodo.status = this.todoForm.value.status;
      this.curTodo.todoType = this.todoForm.value.todoType;
      this.curTodo.assignedUser = this.todoForm.value.assignfor;
      //
      this.curTodo.taskId = this.curTaskId;
      this.curTodo.projectId = this.curProjectId;
      this.curTodo.createUser = this.myAccount.id;
      console.log('click save!!');
      console.log(JSON.stringify(this.curTodo));
      this.todoService.createTodo(this.curTodo).subscribe((data) => {
        console.log('create', data);
        alert('Create success!!');
        this.getData();
        this.getAllData();
        this.modalService.dismissAll();
        // this.ngOnInit();
      });
    } else {
      alert('Input invalid!!!');
    }
  }
  saveUpdateTodo() {
    if (this.todoForm.valid) {
      this.todoDetail.name = this.todoForm.value.name;
      this.todoDetail.des = this.todoForm.value.des;
      this.todoDetail.startDate = this.fomatInput.fomatDate(
        this.todoForm.value.startDate
      );
      this.todoDetail.endDate = this.fomatInput.fomatDate(
        this.todoForm.value.endDate
      );
      this.todoDetail.status = this.todoForm.value.status;
      this.todoDetail.todoType = this.todoForm.value.todoType;
      this.todoDetail.assignedUser = this.todoForm.value.assignfor;

      this.updateTodoStatus.preStatus = this.todoDetail.status;
      this.updateTodoStatus.todoId = this.todoDetail.id;
      this.updateTodoStatus.updateUser = this.todoForm.value.assignfor;
      this.updateTodoStatus.des = this.todoForm.value.des;
      this.updateTodoStatus.status = this.todoForm.value.status;

      this.todoDetail.todoHistoryList.push(this.updateTodoStatus);
    // this.curTodo.status = this.statusUpdate;
      console.log(this.updateTodoStatus);
      console.log(this.todoDetail);
      this.todoService.insertHistory(this.updateTodoStatus).subscribe(
        (data) => {
          console.log(data);
          console.log('click save!!');
          console.log(JSON.stringify(this.todoDetail));
          // this.modalService.dismissAll();
          this.todoService.updateStatus(this.todoDetail).subscribe((data) => {
            console.log('create', data);
            alert('update success!!');
            this.getData();
            this.getAllData();
            this.modalService.dismissAll();
            this.ngOnInit();
          });
          this.modalService.dismissAll();
        },
        (error) => {
          console.log(error.error.message);
        }
      );
      //
      // this.curTodo.taskId=this.curTaskId;
      // this.curTodo.projectId=this.curProjectId;
      // this.curTodo.createUser=this.myAccount.id;
    } else {
      alert('Input invalid!!!');
    }
  }

  updateStatus() {
    console.log(this.statusUpdate);
    this.updateTodoStatus.preStatus = this.todoDetail.status;
    this.updateTodoStatus.todoId = this.todoDetail.id;
    this.updateTodoStatus.updateUser = this.todoDetail.assignedUser;
    this.updateTodoStatus.des = this.updateform.controls['des'].value;
    this.updateTodoStatus.status = this.statusUpdate;
    this.todoDetail.todoHistoryList.push(this.updateTodoStatus);
    this.todoDetail.status = this.statusUpdate;

    console.log(this.updateTodoStatus);

    this.todoService.insertHistory(this.updateTodoStatus).subscribe(
      (data) => {
        console.log(data);
        this.modalService.dismissAll();
      },
      (error) => {
        console.log(error.error.message);
      }
    );

    this.todoService.updateStatus(this.todoDetail).subscribe(
      (data) => {
        console.log(data);
        this.modalService.dismissAll();
        this.getData();
        this.getAllData();
        window.alert('update status success');
      },
      (error) => {
        console.log(error.error.message);
        window.alert('update status false');
      }
    );
  }

  openDetails(content: any, element) {
    this.todoDetail = element;
    this.openModal(content);
  }

  openHistory(content: any, element) {
    this.todoHistory = element.todoHistoryList;
    console.log(element);
    console.log(this.todoHistory);
    this.openModal(content);
  }

  openUpdate(content: any, element) {
    this.select = false;
    this.todoDetail = element;
    this.openModal(content);
  }

  openUpdateTodo(content: any, element) {
    this.isEmployeeOfTodo = false;
    this.todoDetail = element;
    if (this.todoDetail.assignedUser === this.curUserId) {
      this.isEmployeeOfTodo = true;
    }
    console.log(
      this.isAdmin +
        ' ' +
        this.isEmployeeOfTodo +
        ' ' +
        this.isLeader +
        ' ' +
        this.curTaskId
    );
    this.makeUpdateForm();
    this.openModal(content);
  }

  openDelete(content: any, idTodo: number) {
    this.idDelete = idTodo;
    this.openModal(content);
  }
  onDelete() {
    this.todoService.deleteTodo(this.idDelete).subscribe((data) => {
      // console.log('delete:', data,typeof(data));
      this.modalService.dismissAll();
      if (data) {
        this.getData();
        this.getAllData();
        alert('Delete seccessed!');
      } else alert('Delete failed!');
    });
  }
  //update status for employee
  selectStatus(event) {
    this.select = true;
    this.statusUpdate = event.target.value;
    console.log(this.statusUpdate);
    console.log(event.target.value);
  }

  //End - update status for employee

  updatePageSize(event) {
    this.thePageSize = event.target.value;
    console.log(this.thePageSize);
    this.thePageNumber = 1;
    this.getData();
  }

  applyFilter(filterValue: string) {
    if (filterValue.trim() !== '') {
      this.dataSource = new MatTableDataSource<Todo>(this.todoListAll);
    } else {
      this.dataSource = new MatTableDataSource<Todo>(this.todoList);
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  get name() {
    return this.todoForm.get('name');
  }
  get des() {
    return this.todoForm.get('des');
  }
  get priority() {
    return this.todoForm.get('priority');
  }
  get startDate() {
    return this.todoForm.get('startDate');
  }
  get endDate() {
    return this.todoForm.get('endDate');
  }
  get status() {
    return this.todoForm.get('status');
  }
  get manager() {
    return this.todoForm.get('manager');
  }
}
