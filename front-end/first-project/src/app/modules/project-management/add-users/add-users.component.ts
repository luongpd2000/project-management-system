import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { User } from 'src/app/data/schema/user';
import { UserService } from 'src/app/service/user.service';
import { ProjectService } from '../../../service/project.service';
import { DetailsUserComponent } from './details-user/details-user.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { idRole } from 'src/app/data/schema/id-role';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  arr2: idRole[] = new Array();
  arrPE: idRole[] = new Array();
  listUsers: User[] = [];
  projectId: number = this.route.snapshot.params['id'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<User>;

  displayedColumns: string[] = ['select', 'id', 'fullName', 'email', 'role', 'action'];
  selection = new SelectionModel<User>(true, []);
  alert: boolean = false;
  closeAlert() {
    this.alert = false;
  }



  constructor(private userService: UserService,
     private projectService: ProjectService,
      private route: ActivatedRoute,
      public dialog: MatDialog,
      private modalService: NgbModal,) {
  }

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    this.userService.getNonPartner(this.projectId).subscribe(data => {
      console.log('run again');

      this.listUsers = data;

      this.listUsers.forEach(data => { data.pRole = 'dev' })

      console.log('list users', this.listUsers);
      this.dataSource = new MatTableDataSource<User>(this.listUsers);

      console.log("datasouce", this.dataSource.data.length);
      this.dataSource.paginator = this.paginator;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    this.selection.selected.forEach(s => {
      console.log(s.id, s.pRole);
      this.arr2.push({ user: s, role: s.pRole, projectId: this.projectId });
    });
    this.saveRole(this.arr2);
    this.modalService.dismissAll();
  }

  saveRole(list: Array<any>) {
    this.projectService.postRole(list).subscribe(data => {
      console.log('ADD User seccess');
      this.alert = true;
      this.arr2 = [];
      this.ngOnInit()
    });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDetails(element: any) {
    console.log(element);

  }

  openDialog(element: any): void {
    const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = element;
       dialogConfig.width='60%'
        this.dialog.open(DetailsUserComponent, dialogConfig);

}
openCofirm(content: any) {
  console.log('confirm');
  this.modalService.open(content, {
    centered: true,
  });
}

}
