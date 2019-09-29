import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsAddTypePage } from './goods-add-type.page';

describe('GoodsAddTypePage', () => {
  let component: GoodsAddTypePage;
  let fixture: ComponentFixture<GoodsAddTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsAddTypePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsAddTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
