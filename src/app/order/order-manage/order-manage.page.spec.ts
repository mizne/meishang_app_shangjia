import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagePage } from './order-manage.page';

describe('OrderManagePage', () => {
  let component: OrderManagePage;
  let fixture: ComponentFixture<OrderManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderManagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
