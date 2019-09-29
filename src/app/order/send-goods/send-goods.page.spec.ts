import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendGoodsPage } from './send-goods.page';

describe('SendGoodsPage', () => {
  let component: SendGoodsPage;
  let fixture: ComponentFixture<SendGoodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendGoodsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendGoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
