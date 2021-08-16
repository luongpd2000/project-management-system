import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavComponent } from './layout/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectService } from './service/project.service';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { ProjectComponent } from './dialog/project/project.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MaterialModule} from './shared/material.module';

 


@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    NavComponent,
    FooterComponent,
    AuthLayoutComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule  ,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
