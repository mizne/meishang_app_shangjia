import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEditNamePage } from './store-edit-name.page';

describe('StoreEditNamePage', () => {
  let component: StoreEditNamePage;
  let fixture: ComponentFixture<StoreEditNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreEditNamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEditNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
