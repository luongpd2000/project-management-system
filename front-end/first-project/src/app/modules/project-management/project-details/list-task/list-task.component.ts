import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../service/task.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  @Input() currentProjectId: number;
  
  taskList:Task[]=[];
  
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    console.log(this.currentProjectId);
    this.getData();
  }

  getData(){
    this.taskService.getListProject(this.currentProjectId).subscribe(data=>{
      this.taskList = data['content'];
      console.log(this.taskList);
      
    })
  }

}
