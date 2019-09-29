import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDayPage } from './choose-day.page';

describe('ChooseDayPage', () => {
  let component: ChooseDayPage;
  let fixture: ComponentFixture<ChooseDayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseDayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
