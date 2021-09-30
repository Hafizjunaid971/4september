import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedosetupAddComponent } from './issuedosetup-add.component';

describe('IssuedosetupAddComponent', () => {
  let component: IssuedosetupAddComponent;
  let fixture: ComponentFixture<IssuedosetupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuedosetupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuedosetupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
