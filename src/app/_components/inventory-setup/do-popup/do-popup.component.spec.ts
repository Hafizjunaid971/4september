import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoPopupComponent } from './do-popup.component';

describe('DoPopupComponent', () => {
  let component: DoPopupComponent;
  let fixture: ComponentFixture<DoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
