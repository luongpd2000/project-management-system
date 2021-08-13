import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyaccountComponent } from './modules/myaccount/myaccount.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { TaskManagementComponent } from './modules/task-management/task-management.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
// import { NoAuthGuard } from '@core/guard/no-auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/project-manager',
    pathMatch: 'full'
  },

  //App Routers
  {
    path: '',
    component: ContentLayoutComponent,
    // canActivate: [NoAuthGuard],
    children:[
      {
        path:'myaccount',
        loadChildren:()=>
          import('./modules/myaccount/myaccount.module').then(m=>m.MyaccountModule)
      },
      {
        path:'task-manager',
        loadChildren:()=>
          import('./modules/task-management/task-management.module').then(m=>m.TaskManagementModule)
      },
      {
        path:'user-manager',
        loadChildren:()=>
          import('./modules/user-management/user-management.module').then(m=>m.UserManagementModule)
      },
      {
        path:'project-manager',
        loadChildren:()=>
          import('./modules/project-management/project-management.module').then(m=>m.ProjectManagementModule)
      },
      {
        path:'todo-manager',
        loadChildren:()=>
          import('./modules/todo-management/todo-management.module').then(m=>m.TodoManagementModule)
      }
      
    ]
  },
  // Auth Routers
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/project-manager', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
