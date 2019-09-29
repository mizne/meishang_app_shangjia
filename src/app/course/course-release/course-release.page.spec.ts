import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseReleasePage } from './course-release.page';

describe('CourseReleasePage', () => {
  let component: CourseReleasePage;
  let fixture: ComponentFixture<CourseReleasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseReleasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseReleasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
