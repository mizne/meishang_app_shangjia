import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawRecordPage } from './withdraw-record.page';

describe('WithdrawRecordPage', () => {
  let component: WithdrawRecordPage;
  let fixture: ComponentFixture<WithdrawRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawRecordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
