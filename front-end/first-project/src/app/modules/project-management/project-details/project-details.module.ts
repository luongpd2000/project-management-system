import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateDMYPipe } from 'src/app/date-dmy.pipe';




@NgModule({
  declarations: [DateDMYPipe],
  imports: [
    CommonModule,
    ProjectDetailsRoutingModule,
    MaterialModule,
    MatButtonModule,
    MatIconModule,
    NgbModule
    
  ]
})
export class ProjectDetailsModule { }
