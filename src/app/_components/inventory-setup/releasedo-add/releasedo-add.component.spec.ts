import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasedoAddComponent } from './releasedo-add.component';

describe('ReleasedoAddComponent', () => {
  let component: ReleasedoAddComponent;
  let fixture: ComponentFixture<ReleasedoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasedoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasedoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
