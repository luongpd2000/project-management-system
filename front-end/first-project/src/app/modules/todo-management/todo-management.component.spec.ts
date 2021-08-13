import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoManagementComponent } from './todo-management.component';

describe('TodoManagementComponent', () => {
  let component: TodoManagementComponent;
  let fixture: ComponentFixture<TodoManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
