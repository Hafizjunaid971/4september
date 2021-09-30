import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturndoAddComponent } from './returndo-add.component';

describe('ReturndoAddComponent', () => {
  let component: ReturndoAddComponent;
  let fixture: ComponentFixture<ReturndoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturndoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturndoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
