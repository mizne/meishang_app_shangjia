import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreWxPage } from './store-wx.page';

describe('StoreWxPage', () => {
  let component: StoreWxPage;
  let fixture: ComponentFixture<StoreWxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreWxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreWxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
