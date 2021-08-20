import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersInProjectComponent } from './members-in-project.component';

describe('MembersInProjectComponent', () => {
  let component: MembersInProjectComponent;
  let fixture: ComponentFixture<MembersInProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersInProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersInProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
