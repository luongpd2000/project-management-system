import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../data/schema/user';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  form!: FormGroup;
  user:User;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<DetailsUserComponent>,
      @Inject(MAT_DIALOG_DATA) data) {

      this.user = data;
      console.log(this.user);
      
  }

  ngOnInit() {
      this.form = this.fb.group({
        id:[this.user.id],
        username:[this.user.username],
          fullName: [this.user.fullName],
          email:[this.user.email],
          phone:[this.user.phone],
          address:[this.user.address]
          

      });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }

}
