
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/data/schema/user';
import { UserService } from 'src/app/service/user.service';
import { ProjectService } from '../../../service/project.service';
export interface idRole{
  userId: number;
  role:String;
  projectId:number;
}

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  arr2: idRole[] = new Array();
  listUsers:User[]= [];
  projectId!:number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!:MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'userName', 'fullName', 'email', 'phone', 'role', 'action'];
  selection = new SelectionModel<User>(true, []);


  constructor(private userService: UserService, private projectService:ProjectService) { 
  }

  ngOnInit(): void {   
    this.getData();
    this.dataSource.paginator = this.paginator;
  }

  getData(){
    this.userService.getAllUsers().subscribe(data=>{
      
      this.listUsers =data['content'];
      console.log('list users', this.listUsers);
      this.dataSource = new MatTableDataSource<User>(this.listUsers);
      console.log("datasouce",this.dataSource.data);
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
    console.log(s.id, s.role);
    this.arr2.push({userId:s.id, role:s.role,projectId:this.projectId});
    
  });
  this.saveRole(this.arr2);
  this.arr2=[];
}

saveRole( list:Array<any>){
  this.projectService.postRole(list).subscribe(data=>{
    console.log('ADD User seccess');

  });

  }


applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

openDetails(element:any){
  console.log(element);
  
}



}
