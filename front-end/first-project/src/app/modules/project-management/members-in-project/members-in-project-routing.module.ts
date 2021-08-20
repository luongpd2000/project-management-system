import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersInProjectComponent } from './members-in-project.component';

const routes: Routes = [
  {path:'',component:MembersInProjectComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersInProjectRoutingModule { }
