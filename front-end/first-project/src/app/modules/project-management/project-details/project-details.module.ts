import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProjectDetailsRoutingModule,
    MaterialModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ProjectDetailsModule { }
