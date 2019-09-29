import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCertificationPage } from './store-certification.page';

describe('StoreCertificationPage', () => {
  let component: StoreCertificationPage;
  let fixture: ComponentFixture<StoreCertificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCertificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCertificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
