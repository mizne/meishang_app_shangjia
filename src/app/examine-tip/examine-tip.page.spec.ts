import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamineTipPage } from './examine-tip.page';

describe('ExamineTipPage', () => {
  let component: ExamineTipPage;
  let fixture: ComponentFixture<ExamineTipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamineTipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamineTipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
