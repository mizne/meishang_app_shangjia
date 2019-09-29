import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashAccountPage } from './cash-account.page';

describe('CashAccountPage', () => {
  let component: CashAccountPage;
  let fixture: ComponentFixture<CashAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashAccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
