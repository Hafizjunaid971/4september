import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryStockAddComponent } from './inventory-stock-add.component';

describe('InventoryStockAddComponent', () => {
  let component: InventoryStockAddComponent;
  let fixture: ComponentFixture<InventoryStockAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryStockAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryStockAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
