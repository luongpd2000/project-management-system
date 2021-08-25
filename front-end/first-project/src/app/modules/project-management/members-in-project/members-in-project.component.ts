import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { User } from 'src/app/data/schema/user';
import { UserService } from 'src/app/service/user.service';
import { ProjectService } from '../../../service/project.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { idRole } from 'src/app/data/schema/id-role';
import { DetailsUserComponent } from '../add-users/details-user/details-user.component';
import { ProjectEmployee } from 'src/app/data/schema/project-employee';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { StatusService } from 'src/app/data/service/status.service';

@Component({
  selector: 'app-members-in-project',
  templateUrl: './members-in-project.component.html',
  styleUrls: ['./members-in-project.component.css']
})
export class MembersInProjectComponent implements OnInit {

  arr2: idRole[] = new Array();
  // listUsers: User[] = [];
  listUsers: ProjectEmployee[] = [];
  projectId: number = this.route.snapshot.params['id'];
  pe: ProjectEmployee;
  isAdmin: boolean = true;
  role!: String;
  filter: String = 'all';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<ProjectEmployee>;

  displayedColumns: string[] = ['stt' ,'id', 'fullName', 'email', 'role', 'status','action'];
  selection = new SelectionModel<ProjectEmployee>(true, []);
  alert: boolean = false;
  closeAlert() {
    this.alert = false;
  }

  constructor(private userService: UserService,
     private projectService: ProjectService,
      private route: ActivatedRoute,
      public dialog: MatDialog,
      private modalService: NgbModal,
      private jwtService: JwtServiceService,
      public getStatus: StatusService) {
  }

  ngOnInit(): void {

    this.role = this.jwtService.getRole();
    if(this.role === '[ROLE_USER]'){
      this.isAdmin = false;
    }

    this.getData();
  }

  getData() {

    this.userService.getUsersInProject(this.projectId).subscribe(
      data=>{
        this.listUsers = data;
        console.log('member: ', this.listUsers);
        this.dataSource = new MatTableDataSource<ProjectEmployee>(this.listUsers);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  getDataActive(){
    this.userService.getUsersActiveInProject(this.projectId).subscribe(
      data=>{
        this.listUsers = data;
        console.log('member: ', this.listUsers);

        this.dataSource = new MatTableDataSource<ProjectEmployee>(this.listUsers);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  getDataDelete(){
    this.userService.getUsersDeletedInProject(this.projectId).subscribe(
      data=>{
        this.listUsers = data;
        console.log('member: ', this.listUsers);

        this.dataSource = new MatTableDataSource<ProjectEmployee>(this.listUsers);
        this.dataSource.paginator = this.paginator;
      }
    )
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteMember(){
      this.projectService.deleteUserInProject(this.pe.id).subscribe(
        data=>{
          console.log(data);
          this.getData();
          this.modalService.dismissAll();
        },
        (error) => {
          console.log(error);
        }
      )
      console.log('delete');

  }

  openDialog(element: any): void {
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = element.user;
       dialogConfig.width='60%'
        this.dialog.open(DetailsUserComponent, dialogConfig);

}
openCofirm(content: any,element) {
  this.pe = element;
  console.log('confirm');
  this.modalService.open(content, {
    centered: true,
  });
}

openCofirmUpdate(content, element){
  this.pe = element;
  console.log('confirm update', element);
  this.modalService.open(content, {
    centered: true,
  });
  this.getData();
}

selectStatus(event){
  console.log(event.target.value)
  this.filter = event.target.value;
  if(this.filter==='all') this.getData();
  if(this.filter==='active') this.getDataActive();
  if(this.filter==='delete') this.getDataDelete();
}


updateRole(){
  this.userService.updateProjectEmployee(this.pe).subscribe(data=>{
    console.log('update', data);
    this.getData();
    this.modalService.dismissAll();
  })
}
}
