import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoodsPage } from './add-goods.page';

describe('AddGoodsPage', () => {
  let component: AddGoodsPage;
  let fixture: ComponentFixture<AddGoodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGoodsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
