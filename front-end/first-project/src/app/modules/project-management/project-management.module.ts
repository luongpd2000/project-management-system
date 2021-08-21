import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectManagementComponent } from './project-management.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/material.module';
import { ListTaskComponent } from './project-details/list-task/list-task.component';
// import { NgSelectModule } from '@ng-select/ng-select';
//

// import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProjectManagementComponent,
    ProjectDetailsComponent,
    TaskDetailsComponent,
    AddUsersComponent,
    ListTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProjectManagementRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    MaterialModule,
    
  ]
})

export class ProjectManagementModule { }
