import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasedoListComponent } from './releasedo-list.component';

describe('ReleasedoListComponent', () => {
  let component: ReleasedoListComponent;
  let fixture: ComponentFixture<ReleasedoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasedoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasedoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
