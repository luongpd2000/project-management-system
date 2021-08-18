import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagementComponent } from './project-management.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { AddUsersComponent } from './add-users/add-users.component';

const routes: Routes = [
  {
  path:'',component: ProjectManagementComponent,pathMatch:"full",
  },
  {path:'p-details/:id',component: ProjectDetailsComponent},
  {path:'task-details', component:TaskDetailsComponent},
  {path:'add-user', component:AddUsersComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
