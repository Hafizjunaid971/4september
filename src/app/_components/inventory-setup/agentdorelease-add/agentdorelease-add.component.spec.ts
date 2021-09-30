import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentdoreleaseAddComponent } from './agentdorelease-add.component';

describe('AgentdoreleaseAddComponent', () => {
  let component: AgentdoreleaseAddComponent;
  let fixture: ComponentFixture<AgentdoreleaseAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentdoreleaseAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentdoreleaseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
