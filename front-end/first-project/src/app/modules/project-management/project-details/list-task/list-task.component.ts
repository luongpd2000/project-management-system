import { Input } from '@angular/core';
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

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  @Input() currentProjectId: number;
  @Input() memberList:any[];

  myUserName!:String;
  myUserId:number;

  leaderList=[];
  taskList:Task[]=[];
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
      this.userService.getUser(this.myUserName).subscribe(data=>{
        this.myUserId=data.id;
      })
    }
    
  }

  getData(){
    this.taskService.getListTaskByProjectId(this.currentProjectId).subscribe(data=>{
      this.taskList = data['content'];
      console.log(this.taskList);
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
      "name":new FormControl('name',[Validators.required]),
      "des":new FormControl(null,[Validators.required]),
      "priority":new FormControl('high',[Validators.required]),
      "startDate":new FormControl(null,[Validators.required]),
      "endDate":new FormControl(null,[Validators.required]),
      "status":new FormControl('draft',[Validators.required]),
      "manager":new FormControl(this.myUserId,[Validators.required])
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
