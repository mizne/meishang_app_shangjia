import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterSellDetailPage } from './after-sell-detail.page';

describe('AfterSellDetailPage', () => {
  let component: AfterSellDetailPage;
  let fixture: ComponentFixture<AfterSellDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterSellDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterSellDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
