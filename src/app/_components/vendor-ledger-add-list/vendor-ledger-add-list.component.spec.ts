import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorLedgerAddListComponent } from './vendor-ledger-add-list.component';

describe('VendorLedgerAddListComponent', () => {
  let component: VendorLedgerAddListComponent;
  let fixture: ComponentFixture<VendorLedgerAddListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorLedgerAddListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorLedgerAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
