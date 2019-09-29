import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreChangePasswordPage } from './store-change-password.page';

describe('StoreChangePasswordPage', () => {
  let component: StoreChangePasswordPage;
  let fixture: ComponentFixture<StoreChangePasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreChangePasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreChangePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
