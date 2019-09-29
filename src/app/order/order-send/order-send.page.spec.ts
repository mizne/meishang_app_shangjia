import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSendPage } from './order-send.page';

describe('OrderSendPage', () => {
  let component: OrderSendPage;
  let fixture: ComponentFixture<OrderSendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
