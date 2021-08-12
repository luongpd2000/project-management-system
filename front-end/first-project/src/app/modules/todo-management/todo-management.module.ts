import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoManagementRoutingModule } from './todo-management-routing.module';
import { TodoManagementComponent } from './todo-management.component';


@NgModule({
  declarations: [
    TodoManagementComponent
  ],
  imports: [
    CommonModule,
    TodoManagementRoutingModule
  ]
})
export class TodoManagementModule { }
