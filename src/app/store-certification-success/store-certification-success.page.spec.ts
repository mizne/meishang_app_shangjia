import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCertificationSuccessPage } from './store-certification-success.page';

describe('StoreCertificationSuccessPage', () => {
  let component: StoreCertificationSuccessPage;
  let fixture: ComponentFixture<StoreCertificationSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCertificationSuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCertificationSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
