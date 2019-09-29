import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsManagePage } from './goods-manage.page';

describe('GoodsManagePage', () => {
  let component: GoodsManagePage;
  let fixture: ComponentFixture<GoodsManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsManagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
