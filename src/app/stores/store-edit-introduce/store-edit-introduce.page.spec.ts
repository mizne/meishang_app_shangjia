import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEditIntroducePage } from './store-edit-introduce.page';

describe('StoreEditIntroducePage', () => {
  let component: StoreEditIntroducePage;
  let fixture: ComponentFixture<StoreEditIntroducePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreEditIntroducePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEditIntroducePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
