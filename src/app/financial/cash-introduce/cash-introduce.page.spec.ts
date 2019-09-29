import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashIntroducePage } from './cash-introduce.page';

describe('CashIntroducePage', () => {
  let component: CashIntroducePage;
  let fixture: ComponentFixture<CashIntroducePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashIntroducePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashIntroducePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
