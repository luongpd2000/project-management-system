import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUsersRoutingModule } from './add-users-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import { DetailsUserComponent } from './details-user/details-user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetailsUserComponent
  ],
  imports: [
    CommonModule,
    AddUsersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddUsersModule { }
