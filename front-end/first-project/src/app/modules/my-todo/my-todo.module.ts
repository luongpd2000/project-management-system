import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTodoRoutingModule } from './my-todo-routing.module';
import { MyTodoComponent } from './my-todo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [
    MyTodoComponent
  ],
  imports: [
    CommonModule,
    MyTodoRoutingModule,
    NgbModule,
    // MatIconModule,
    MatButtonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MyTodoModule { }
