import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/data/schema/task';
import { StatusService } from 'src/app/data/service/status.service';
import { TaskService } from '../../../../service/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FomatInputService } from 'src/app/data/service/fomat-input.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/data/schema/user';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { TaskHistory } from 'src/app/data/schema/task-history';
import { TodoService } from 'src/app/service/todo.service';
import { DatePipe } from '@angular/common';
import { ProjectEmployee } from 'src/app/data/schema/project-employee';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit {
  @Input() currentProjectId: number;
  @Input() memberList: ProjectEmployee[];
  @Input() taskNum: number;
  @Output() taskNumChanged: EventEmitter<number> = new EventEmitter();
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  d1: string;
  d2: string;
  dateCheck = true;
  formSearch: FormGroup;
  isSearchAll = true;
  myUserName!: String;
  myUserId: number;
  deleteTask: Task;
  detailTask: Task = new Task();
  taskHisrotyList: TaskHistory[] = [];
  isAdmin: boolean = false;
  curUser: User = new User();
  leaderList = [];
  taskList: Task[] = [];
  taskListAll: Task[] = [];
  formTask!: FormGroup;
  newTask = new Task();
  isLeaderOfProject = false;
  isLeaderOfTask = false;

  constructor(
    private taskService: TaskService,
    public getStatus: StatusService,
    private modalService: NgbModal,
    private fomatInput: FomatInputService,
    private jwt: JwtServiceService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    // console.log(this.currentProjectId);
    // console.log('mem list: ', this.memberList);
    this.getData();
    this.myUserName = this.jwt.getUsername();
    this.makeSearchForm();

    if (this.myUserName != null) {
      if (this.myUserName === 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }

      this.userService.getUser(this.myUserName).subscribe((data) => {
        // console.log(data);
        this.curUser = data;
        this.myUserId = data.id;
        this.getLeaderList();
      },
        (error) => {
          // console.log(error.error.message);
        });

    }
  }
  increaseTaskNum() {
    this.taskNum++;
    this.taskNumChanged.emit(this.taskNum);
    // console.log('increase task num');

  }
  decreaseTaskNum() {
    this.taskNum--;
    this.taskNumChanged.emit(this.taskNum);
  }

  makeSearchForm() {
    this.formSearch = this.formBuilder.group({
      name: [''],
      status: [''],
      priority: [''],
      type: [''],
      leader: [''],
      startDate: [''],
      endDate: ['']
    });
  }

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

  getLeaderList() {

    this.projectService.findListEmployeeByProjectId(this.currentProjectId).subscribe(
      data => {
        this.memberList = data;
        // console.log(data);
        this.memberList.forEach(
          (data) => {
            // console.log('list mem list task', data);
            if ((data.role === 'leader' || data.role === 'admin') && data.delete === false) {
              this.leaderList.push(data.user);
              if (data.user.id === this.myUserId) {
                // console.log(data.user.id + ' ' + this.myUserId);
                this.isLeaderOfProject = true;
              }
            }
            // console.log('list task leader: ', this.leaderList);
          })
      },
      (error) => {
        // console.log(error.error.message);
      }
    )
  }

  getData() {// get all tasks in project pageable
    if (this.isSearchAll) {
      this.taskService
        .getListTaskByProjectIdPageable(
          this.currentProjectId,
          this.thePageNumber - 1,
          this.thePageSize
        )
        .subscribe(
          (data) => {
            this.taskList = data['content'];
            // console.log(this.taskList);
            this.dataSource = new MatTableDataSource<Task>(this.taskList);
            this.thePageNumber = data.pageable.pageNumber + 1;
            this.thePageSize = data.pageable.pageSize;
            this.theTotalElements = data.totalElements;
          },
          (error) => {
            // console.log(error.error.message);
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
    let leader = this.formSearch.value.leader;
    this.taskService.searchTask(name, status, priority, type, leader,
      startDate, endDate, this.currentProjectId, this.thePageNumber - 1, this.thePageSize)
      .subscribe(data => {
        this.taskList = data['content'];
        // console.log(this.taskList);
        this.dataSource = new MatTableDataSource<Task>(this.taskList);
        this.thePageNumber = data.pageable.pageNumber + 1;
        this.thePageSize = data.pageable.pageSize;
        this.theTotalElements = data.totalElements;
      })

  }
  getAllTask() {
    this.isSearchAll = true;
    this.getData();
    this.makeSearchForm();

  }

  open(content: any) {
    this.isSearchAll = false;
    this.makeForm();
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
    });
  }
  makeForm() {
    this.formTask = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      des: new FormControl(null, [Validators.required]),
      priority: new FormControl('high', [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null),
      status: new FormControl('draft', [Validators.required]),
      manager: new FormControl(this.myUserId, [Validators.required]),
      taskType: new FormControl('feature', [Validators.required]),
    });
  }

  saveNewTask() {
    this.dateCheck = true;
    if (this.formTask.valid) {
      this.newTask.name = this.formTask.value.name;
      this.newTask.des = this.formTask.value.des;
      this.newTask.startDate = this.fomatInput.fomatDate(
        this.formTask.value.startDate
      );
      this.newTask.endDate = this.fomatInput.fomatDate(
        this.formTask.value.endDate
      );
      this.newTask.status = this.formTask.value.status;
      this.newTask.priority = this.formTask.value.priority;
      this.newTask.taskManagerId = this.formTask.value.manager;
      this.newTask.createUser = this.myUserId;
      this.newTask.taskType = this.formTask.value.taskType;
      this.newTask.projectId = this.currentProjectId;


      this.d1 = this.newTask.startDate.toString();
      this.d2 = this.newTask.endDate.toString();
      if (
        (this.newTask.endDate !== '' &&
          this.fomatInput.compare(this.d1, this.d2)) ||
        this.newTask.endDate === ''
      ) {

        this.taskService.createTask(this.newTask).subscribe((data) => {
          // console.log('new', data);
          this.modalService.dismissAll();
          this.getData();
          this.increaseTaskNum();
        });
      } else {
        this.dateCheck = false;
      }
    } else {
      alert('Input invalid!!!');
    }
  }

  openConfirmDelete(content: any, task: Task) {
    this.isLeaderOfTask = false;
    if (task.taskManagerId === this.myUserId) {
      this.isLeaderOfTask = true;
    }
    this.deleteTask = task;
    this.modalService.open(content, {
      centered: true,
    });
  }
  onDelete() {
    // console.log(this.deleteTask);
    this.taskService.deleteTask(this.deleteTask).subscribe((data) => {
      // console.log(data);
      this.getData();
      this.decreaseTaskNum();
    });
    this.modalService.dismissAll();
  }

  openHistory(content: any, element) {
    this.detailTask = element;
    // console.log(this.detailTask);
    this.taskHisrotyList = this.detailTask.taskHistoryList;
    // console.log(this.taskHisrotyList);
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
    });
  }

  updatePageSize(event) {
    this.thePageSize = event.target.value;
    // console.log(this.thePageSize);
    this.thePageNumber = 1;
    this.getData();
  }

  // use for Form
  get name() {
    return this.formTask.get('name');
  }
  get des() {
    return this.formTask.get('des');
  }
  get priority() {
    return this.formTask.get('priority');
  }
  get startDate() {
    return this.formTask.get('startDate');
  }
  get endDate() {
    return this.formTask.get('endDate');
  }
  get status() {
    return this.formTask.get('status');
  }
  get manager() {
    return this.formTask.get('manager');
  }
}
