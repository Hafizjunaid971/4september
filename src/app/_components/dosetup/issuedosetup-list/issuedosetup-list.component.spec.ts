import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedosetupListComponent } from './issuedosetup-list.component';

describe('IssuedosetupListComponent', () => {
  let component: IssuedosetupListComponent;
  let fixture: ComponentFixture<IssuedosetupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuedosetupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuedosetupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
