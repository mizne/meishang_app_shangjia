import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePayPage } from './store-pay.page';

describe('StorePayPage', () => {
  let component: StorePayPage;
  let fixture: ComponentFixture<StorePayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
