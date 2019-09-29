import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrozenTipPage } from './frozen-tip.page';

describe('FrozenTipPage', () => {
  let component: FrozenTipPage;
  let fixture: ComponentFixture<FrozenTipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrozenTipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrozenTipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
