import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTaskRoutingModule } from './my-task-routing.module';
import { MyTaskComponent } from './my-task.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    MyTaskComponent
  ],
  imports: [
    CommonModule,
    MyTaskRoutingModule,
    MaterialModule,
    NgbModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MyTaskModule { }
