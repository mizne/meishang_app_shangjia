import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsEvaluateEditPage } from './goods-evaluate-edit.page';

describe('GoodsEvaluateEditPage', () => {
  let component: GoodsEvaluateEditPage;
  let fixture: ComponentFixture<GoodsEvaluateEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsEvaluateEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsEvaluateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
