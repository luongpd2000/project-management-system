import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material/material/material.module';


@NgModule({
  declarations: [
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MaterialModule
  ],
  exports:[
    MaterialModule
  ]
})
export class UserManagementModule { }
