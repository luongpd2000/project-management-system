import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTaskRoutingModule } from './my-task-routing.module';
import { MyTaskComponent } from './my-task.component';


@NgModule({
  declarations: [
    MyTaskComponent
  ],
  imports: [
    CommonModule,
    MyTaskRoutingModule
  ]
})
export class MyTaskModule { }
