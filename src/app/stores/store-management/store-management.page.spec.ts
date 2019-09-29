import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreManagementPage } from './store-management.page';

describe('StoreManagementPage', () => {
  let component: StoreManagementPage;
  let fixture: ComponentFixture<StoreManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreManagementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
