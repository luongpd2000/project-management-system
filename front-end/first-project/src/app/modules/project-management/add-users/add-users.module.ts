import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUsersRoutingModule } from './add-users-routing.module';
import { MaterialModule } from '../../../shared/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddUsersRoutingModule,
    MaterialModule
  ]
})
export class AddUsersModule { }
