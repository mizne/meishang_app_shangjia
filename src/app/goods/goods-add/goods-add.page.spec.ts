import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsAddPage } from './goods-add.page';

describe('GoodsAddPage', () => {
  let component: GoodsAddPage;
  let fixture: ComponentFixture<GoodsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
