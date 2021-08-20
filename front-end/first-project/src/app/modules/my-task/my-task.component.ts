import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/data/schema/task';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {

  page: Number = 0;
  size: Number = 5;
  tasks: Task[] = new Array<Task>();
  test: Task = new Task();
  constructor(private taskService: TaskService) {

  }
  arrays= [1, 2, 3, 4, 5];
  ngOnInit(): void {

    this.taskService.getTaskList(0, 5).subscribe(data =>{
      this.tasks = data;
      alert(data);
    });

    // this.taskService.getTask(1).subscribe(data =>{
    //   this.test = data;
    //   console.log(data);
    // });

  }
}

