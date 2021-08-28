import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { DatePipe } from '@angular/common';

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
  @Input() memberList: ProjectEmployee[];
  @Input() todoNum: number;
  @Output() todoNumChanged: EventEmitter<number> = new EventEmitter();
  increaseTodoNum() {
    this.todoNum++;
    this.todoNumChanged.emit(this.todoNum);
    console.log('increase task num');

  }
  decreaseTodoNum() {
    this.todoNum--;
    this.todoNumChanged.emit(this.todoNum);
  }
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
  employeeList: User[] = [];
  leaderList: User[] = [];
  isEmployeeOfTodo: boolean = false;
  // isLeader: boolean;;
  d1: string;
  d2: string;
  dateCheck = true;

  myAccount: User;
  curTodo: Todo = new Todo();

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  formSearch: FormGroup;
  isSearchAll = true;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private jwt: JwtServiceService,
    private router: Router,
    private todoService: TodoService,
    private userService: UserService,
    public getStatus: StatusService,
    public fomatInput: FomatInputService,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getData();
    console.log('init todo-list');
    this.userService.getUser(this.jwt.getUsername()).subscribe((data) => {
      this.myAccount = data;
      console.log('myAcc', data);

    });
    this.getMembers();
    this.updateform = new FormGroup({
      des: new FormControl(''),
    });
    this.makeSearchForm();
    console.log('myAccountId: ', this.myAccount.id);

  }
  makeSearchForm() {
    this.formSearch = this.formBuilder.group({
      name: [''],
      status: [''],
      priority: [''],
      type: [''],
      assgined_for: [0],
      startDate: [''],
      endDate: ['']
    });
  }

  dataSource!: MatTableDataSource<Todo>;
  displayedColumns: string[] = [
    'STT',
    'ID',
    'Name',
    'Created Date',
    'Start Date',
    'Status',
    'Task Id',
    'Priority',
    'Todo Type',
    'Action',
  ];

  selection = new SelectionModel<Todo>(true, []);

  getMembers() {
    console.log('find member: ', this.curProjectId);
    this.memberList.forEach(data => {
      console.log(data);
      if ((data.role === 'leader' || data.role === 'admin') && data.delete === false) {
        this.leaderList.push(data.user);
      } else if (data.role === 'dev' && data.delete === false) {
        this.employeeList.push(data.user);
      }
    })
  }


  getData() {
    if (this.isSearchAll) {
      this.todoService
        .getTodoListByTask(
          this.curTaskId,
          this.thePageNumber - 1,
          this.thePageSize
        )
        .subscribe(
          (data) => {
            this.todoList = data['content'];
            // this.todoListAll = this.todoList;
            this.todoList.forEach((data) => {
              this.userService
                .getUserById(data.assignedUser)
                .subscribe((item) => {
                  data.assignedUserDetails = item;
                });
            });
            console.log(this.todoList);
            console.log(this.todoList[0]);
            this.dataSource = new MatTableDataSource<Todo>(this.todoList);
            this.thePageNumber = data.pageable.pageNumber + 1;
            this.thePageSize = data.pageable.pageSize;
            this.theTotalElements = data.totalElements;
          },
          (error) => {
            console.log(error.error.message);
          }
        );
    } else {
      this.onSearch();
    }

  }

  onSearch() {
    this.isSearchAll = false;

    let name = this.formSearch.value.name;
    let status = this.formSearch.value.status;
    let startDate = this.datepipe.transform(this.formSearch.value.startDate, 'yyyy-MM-dd');
    startDate = startDate == null ? '' : startDate;
    let endDate = this.datepipe.transform(this.formSearch.value.endDate, 'yyyy-MM-dd');
    endDate = endDate == null ? '' : endDate;
    let priority = this.formSearch.value.priority;
    let type = this.formSearch.value.type;
    let assignedFor = this.formSearch.value.assgined_for;

    this.todoService.searchTodo(name, status, priority, type, assignedFor,
      startDate, endDate, this.curTaskId, this.curProjectId, this.thePageNumber - 1, this.thePageSize)
      .subscribe(data => {
        this.todoList = data['content'];
        console.log('searchList: ', this.todoList);

        this.dataSource = new MatTableDataSource<Todo>(this.todoList);
        this.thePageNumber = data.pageable.pageNumber + 1;
        this.thePageSize = data.pageable.pageSize;
        this.theTotalElements = data.totalElements;
      })
  }

  getAllTodo() {
    this.isSearchAll = true;
    this.getData();
    this.makeSearchForm();

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
      des: new FormControl('', [Validators.required]),
      startDate: new FormControl([Validators.required]),
      endDate: new FormControl(),
      status: new FormControl('draft', [Validators.required]),
      todoType: new FormControl('feature', [Validators.required]),
      priority: new FormControl('high', [Validators.required]),
      assignfor: new FormControl(this.myAccount.id, [Validators.required]),
    });
  }
  makeUpdateForm() {
    this.todoForm = new FormGroup({
      name: new FormControl(this.todoDetail.name, [Validators.required]),
      des: new FormControl(this.todoDetail.des, [Validators.required]),
      startDate: new FormControl(
        this.fomatInput.toDatePicker(this.todoDetail.startDate),
        [Validators.required]
      ),
      endDate: new FormControl(
        this.todoDetail.endDate == null ? null : this.fomatInput.toDatePicker(this.todoDetail.endDate)
      ),
      status: new FormControl(this.todoDetail.status, [Validators.required]),
      todoType: new FormControl(this.todoDetail.todoType, [
        Validators.required,
      ]),
      priority: new FormControl(this.todoDetail.priority, [
        Validators.required,
      ]),
      assignfor: new FormControl(this.todoDetail.assignedUser, [
        Validators.required,
      ]),
    });
  }
  saveNewTodo() {
    this.dateCheck = true;
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
      this.curTodo.priority = this.todoForm.value.priority;
      this.curTodo.assignedUser = this.todoForm.value.assignfor;
      //
      this.curTodo.taskId = this.curTaskId;
      this.curTodo.projectId = this.curProjectId;
      this.curTodo.createUser = this.myAccount.id;

      this.d1 = this.curTodo.startDate.toString();
      this.d2 = this.curTodo.endDate.toString();
      console.log(this.d1 + this.d2)
      if (
        (this.curTodo.endDate !== '' &&
          this.fomatInput.compare(this.d1, this.d2)) ||
        this.curTodo.endDate === ''
      ) {
        console.log('click save!!');
        console.log(JSON.stringify(this.curTodo));
        this.todoService.createTodo(this.curTodo).subscribe((data) => {
          console.log('create', data);
          alert('Create success!!');
          this.increaseTodoNum();
          this.getData();
          this.modalService.dismissAll();
        });
      } else {
        this.dateCheck = false;
      }
    } else {
      alert('Input invalid!!!');
      console.log(this.todoForm)
    }
  }
  saveUpdateTodo() {
    this.dateCheck = true;
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
      this.d1 = this.todoDetail.startDate.toString();
      this.d2 = this.todoDetail.endDate.toString();
      if (
        (this.todoDetail.endDate !== '' &&
          this.fomatInput.compare(this.d1, this.d2)) ||
        this.todoDetail.endDate === ''
      ) {
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
              this.modalService.dismissAll();
              this.ngOnInit();
            });
            this.modalService.dismissAll();
          },
          (error) => {
            console.log(error.error.message);
          }
        );
      } else {
        this.dateCheck = false;
      }
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
      this.modalService.dismissAll();
      if (data) {
        this.getData();
        alert('Delete seccessed!');
        this.decreaseTodoNum();
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
