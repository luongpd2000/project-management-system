import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersInProjectRoutingModule } from './members-in-project-routing.module';
import { MembersInProjectComponent } from './members-in-project.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
@NgModule({
  declarations: [
    MembersInProjectComponent
  ],
  imports: [
    CommonModule,
    MembersInProjectRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MembersInProjectModule { }
