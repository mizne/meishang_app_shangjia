import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InforPage } from './infor.page';

describe('InforPage', () => {
  let component: InforPage;
  let fixture: ComponentFixture<InforPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InforPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InforPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
