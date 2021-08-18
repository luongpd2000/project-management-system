import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectManagementComponent } from './project-management.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { ProjectComponent } from 'src/app/dialog/project/project.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {MatDatepickerModule} from '@angular/material/datepicker';
import {MaterialModule} from '../../shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ProjectManagementComponent,
    ProjectDetailsComponent,
    TaskDetailsComponent,
    AddUsersComponent
  ],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MaterialModule
   
  ],
  entryComponents:[ProjectComponent]
})
export class ProjectManagementModule { }
