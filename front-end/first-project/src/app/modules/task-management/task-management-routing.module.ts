import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagementComponent } from './task-management.component';
import { AddUserToProjectComponent } from './add-user-to-project/add-user-to-project.component';

const routes: Routes = [
  {
    path:'',
    component: TaskManagementComponent,
    pathMatch: 'full'
  },
  {
    path:'add-user',
    component: AddUserToProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagementRoutingModule {}
