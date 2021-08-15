import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import{Project} from '../../data/schema/project';


@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {
  projectList:Project[]=[];
  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(data=>{
      this.projectList=data['content'];
      console.log(this.projectList);
    },error=>{console.log(error.error.message)});
  }
  }


