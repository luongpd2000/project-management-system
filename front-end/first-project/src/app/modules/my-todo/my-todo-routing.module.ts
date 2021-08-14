import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyaccountComponent } from '../myaccount/myaccount.component';
import { MyTodoComponent } from './my-todo.component';

const routes: Routes = [
  {
    path:'', component:MyTodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTodoRoutingModule { }
