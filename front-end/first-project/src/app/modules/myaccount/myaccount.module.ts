import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyaccountRoutingModule } from './myaccount-routing.module';
import { MyaccountComponent } from './myaccount.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule  } from '@angular/forms'


@NgModule({
  declarations: [
    MyaccountComponent
  ],
  imports: [
    CommonModule,
    MyaccountRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MyaccountModule { }
