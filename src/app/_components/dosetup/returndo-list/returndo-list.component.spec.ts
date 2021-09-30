import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturndoListComponent } from './returndo-list.component';

describe('ReturndoListComponent', () => {
  let component: ReturndoListComponent;
  let fixture: ComponentFixture<ReturndoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturndoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturndoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
