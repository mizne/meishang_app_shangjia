import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsCommentsPage } from './goods-comments.page';

describe('GoodsCommentsPage', () => {
  let component: GoodsCommentsPage;
  let fixture: ComponentFixture<GoodsCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsCommentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
