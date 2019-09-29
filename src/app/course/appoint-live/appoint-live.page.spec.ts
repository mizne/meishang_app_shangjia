import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointLivePage } from './appoint-live.page';

describe('AppointLivePage', () => {
  let component: AppointLivePage;
  let fixture: ComponentFixture<AppointLivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointLivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointLivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
