import {NgModule} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatInputModule} from '@angular/material/input';

import {MatPaginatorModule} from '@angular/material/paginator';

import {MatSelectModule} from '@angular/material/select';

import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  exports: [
    MatCheckboxModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
