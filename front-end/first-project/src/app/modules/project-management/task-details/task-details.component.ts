import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/data/schema/task';
import { StatusService } from 'src/app/data/service/status.service';
import { TaskService } from '../../../service/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../service/user.service';
import { FomatInputService } from 'src/app/data/service/fomat-input.service';
import { User } from 'src/app/data/schema/user';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { LoginService } from 'src/app/service/login.service';
import { TodoService } from 'src/app/service/todo.service';
import { Todo } from 'src/app/data/schema/todo';
import { TaskHistory } from 'src/app/data/schema/task-history';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  currentTask = new Task();
  updateTask = new Task();
  curTaskId: number;
  curProjectId: number;
  formTask!: FormGroup;
  curLeader = new User();
  curUserId: number;
  memberList = [];
  leaderList = [];
  employeeList = [];
  isLeader: boolean = false;
  isAdmin: boolean = false;
  todoNum: number;
  todoList: [];
  taskHistory= new TaskHistory;

  getMembers() {
    this.userService.getUsersInProject(this.curProjectId).subscribe((data) => {
      this.memberList = data['content'];
      this.memberList.forEach((data) => {
        if (data.role == 'leader') {
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
    private taskService: TaskService,
    public getStatus: StatusService,
    private modalService: NgbModal,
    private userService: UserService,
    private fomatInput: FomatInputService,
    private loginService: LoginService,
    private jwtService: JwtServiceService,
    private todoService: TodoService
  ) {
    this.curTaskId = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.isAdmin = false;
    this.isLeader = false;
    this.curUserId = this.loginService.userId;
    if (this.jwtService.getRole() === '[ROLE_ADMIN]') {
      this.isAdmin = true;
    }
    this.getTaskDetails();
    this.getTodoNum();
  }
  getTaskDetails() {
    this.taskService.getTask(this.curTaskId).subscribe((data) => {
      this.currentTask = data;
      this.curProjectId = <number>this.currentTask.projectId;
      this.getMembers();
      if (this.currentTask.taskManagerId === this.curUserId) {
        this.isLeader = true;
      }
      // console.log('pId',this.curProjectId);
      // console.log('currentTask: ', this.currentTask);
    });
  }

  getTodoNum() {
    this.todoService.getTodoListByTasNoPageable(this.curTaskId).subscribe(
      (data) => {
        this.todoList = data;
        this.todoNum = this.todoList.length;
        console.log(this.todoList.length);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  open(content: any) {
    this.makeForm();
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
    });
  }
  makeForm() {
    this.formTask = new FormGroup({
      name: new FormControl(this.currentTask.name, [Validators.required]),
      des: new FormControl('description', [Validators.required]),
      priority: new FormControl(this.currentTask.priority, [
        Validators.required,
      ]),
      startDate: new FormControl(
        this.fomatInput.toDatePicker(this.currentTask.startDate),
        [Validators.required]
      ),
      endDate: new FormControl(
        this.fomatInput.toDatePicker(this.currentTask.endDate),
        [Validators.required]
      ),
      status: new FormControl(this.currentTask.status, [Validators.required]),
      taskType: new FormControl(this.currentTask.taskType, [
        Validators.required,
      ]),
      manager: new FormControl(this.currentTask.taskManagerId, [
        Validators.required,
      ]),
    });
  }

  saveTask() {
    if (this.formTask.valid) {
      this.currentTask.name = this.formTask.value.name;
      this.currentTask.des = this.formTask.value.des;
      this.currentTask.startDate = this.fomatInput.fomatDate(
        this.formTask.value.startDate
      );
      this.currentTask.endDate = this.fomatInput.fomatDate(
        this.formTask.value.endDate
      );
      this.currentTask.status = this.formTask.value.status;
      this.currentTask.priority = this.formTask.value.priority;
      this.currentTask.taskType = this.formTask.value.taskType;
      this.currentTask.taskManagerId = this.formTask.value.manager;

      this.taskHistory.des = this.formTask.value.des;
      this.taskHistory.preStatus = this.currentTask.status;
      this.taskHistory.status = this.formTask.value.status;
      this.taskHistory.taskId = this.currentTask.id;
      this.taskHistory.updateUser = this.curUserId;

      this.taskService.createTaskHistory(this.taskHistory).subscribe(
        (data) => {
          console.log(data + ' ok');
          console.log('click save!!');
          console.log(JSON.stringify(this.currentTask));
          this.taskService.updateTask(this.currentTask).subscribe((data) => {
            console.log('update', data);
            alert('Edit Success');
            this.modalService.dismissAll();
            this.getTaskDetails();
          });
        },
        (error) => {
          console.log(error.error.message);
        }
      );
      //
      //   console.log('click save!!');
      //   console.log(JSON.stringify(this.currentTask));
      //   this.taskService.updateTask(this.currentTask).subscribe((data) => {
      //     console.log('update', data);
      //     alert('Edit Success');
      //     this.modalService.dismissAll();
      //     this.getTaskDetails();
      //   });
    } else {
      alert('Input invalid!!!');
    }
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
