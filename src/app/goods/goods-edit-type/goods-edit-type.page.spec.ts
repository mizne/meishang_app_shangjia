import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsEditTypePage } from './goods-edit-type.page';

describe('GoodsEditTypePage', () => {
  let component: GoodsEditTypePage;
  let fixture: ComponentFixture<GoodsEditTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsEditTypePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsEditTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
