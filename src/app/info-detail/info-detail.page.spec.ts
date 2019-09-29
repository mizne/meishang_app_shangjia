import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDetailPage } from './info-detail.page';

describe('InfoDetailPage', () => {
  let component: InfoDetailPage;
  let fixture: ComponentFixture<InfoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
