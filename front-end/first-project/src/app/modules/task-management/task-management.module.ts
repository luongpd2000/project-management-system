import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagementRoutingModule } from './task-management-routing.module';
import { TaskManagementComponent } from './task-management.component';
import { AddUserToProjectComponent } from './add-user-to-project/add-user-to-project.component';


@NgModule({
  declarations: [
    TaskManagementComponent,
    AddUserToProjectComponent
  ],
  imports: [
    CommonModule,
    TaskManagementRoutingModule
  ]
})
export class TaskManagementModule { }
