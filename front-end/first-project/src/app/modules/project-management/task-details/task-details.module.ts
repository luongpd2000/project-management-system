import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDetailsRoutingModule } from './task-details-routing.module';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    TaskDetailsRoutingModule,
    NgbModule,
    // MatIconModule,
    MatButtonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TaskDetailsModule { }
