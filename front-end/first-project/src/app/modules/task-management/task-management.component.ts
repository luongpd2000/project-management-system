import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit {
  closeModal!: string;
  
  constructor(private modalService: NgbModal) { }
  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      
    });
  }

  ngOnInit(): void {
  }

}
