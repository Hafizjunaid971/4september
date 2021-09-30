import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgradeListComponent } from './addgrade-list.component';

describe('AddgradeListComponent', () => {
  let component: AddgradeListComponent;
  let fixture: ComponentFixture<AddgradeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddgradeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgradeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
