import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementstockListComponent } from './placementstock-list.component';

describe('PlacementstockListComponent', () => {
  let component: PlacementstockListComponent;
  let fixture: ComponentFixture<PlacementstockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementstockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementstockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
