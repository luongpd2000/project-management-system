import {NgModule} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatInputModule} from '@angular/material/input';

import {MatPaginatorModule} from '@angular/material/paginator';

import {MatSelectModule} from '@angular/material/select';

import {MatTableModule} from '@angular/material/table';


@NgModule({
  exports: [
    MatCheckboxModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
  ]
})
export class MaterialModule {}


/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
