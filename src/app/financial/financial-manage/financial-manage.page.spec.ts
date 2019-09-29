import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialManagePage } from './financial-manage.page';

describe('FinancialManagePage', () => {
  let component: FinancialManagePage;
  let fixture: ComponentFixture<FinancialManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialManagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
