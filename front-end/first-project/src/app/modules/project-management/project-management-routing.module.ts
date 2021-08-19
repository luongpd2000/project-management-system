import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagementComponent } from './project-management.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AddUsersComponent } from './add-users/add-users.component';

const routes: Routes = [
  {
    path:'',component: ProjectManagementComponent,pathMatch:"full",
    },
    {path:'p-details/:id',component: ProjectDetailsComponent},
    {path:'task-details', component:TaskDetailsComponent},
    {path:'add-user/:id', loadChildren:()=>
    import('./add-users/add-users.module').then(m=>m.AddUsersModule)}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
