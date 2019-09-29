import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseManagePage } from './course-manage.page';

describe('CourseManagePage', () => {
  let component: CourseManagePage;
  let fixture: ComponentFixture<CourseManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseManagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
