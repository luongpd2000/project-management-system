import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTodoRoutingModule } from './my-todo-routing.module';
import { MyTodoComponent } from './my-todo.component';


@NgModule({
  declarations: [
    MyTodoComponent
  ],
  imports: [
    CommonModule,
    MyTodoRoutingModule
  ]
})
export class MyTodoModule { }
