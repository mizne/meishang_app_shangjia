import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsSearchPage } from './goods-search.page';

describe('GoodsSearchPage', () => {
  let component: GoodsSearchPage;
  let fixture: ComponentFixture<GoodsSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
