import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoManagementComponent } from './todo-management.component';

const routes: Routes = [
  {path:'', component: TodoManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoManagementRoutingModule { }
