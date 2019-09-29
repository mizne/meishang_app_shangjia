import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCardPage } from './store-card.page';

describe('StoreCardPage', () => {
  let component: StoreCardPage;
  let fixture: ComponentFixture<StoreCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
