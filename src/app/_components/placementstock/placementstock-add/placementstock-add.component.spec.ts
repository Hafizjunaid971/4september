import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementstockAddComponent } from './placementstock-add.component';

describe('PlacementstockAddComponent', () => {
  let component: PlacementstockAddComponent;
  let fixture: ComponentFixture<PlacementstockAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementstockAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementstockAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
