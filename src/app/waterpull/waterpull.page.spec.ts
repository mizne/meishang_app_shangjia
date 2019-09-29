import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterpullPage } from './waterpull.page';

describe('WaterpullPage', () => {
  let component: WaterpullPage;
  let fixture: ComponentFixture<WaterpullPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterpullPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterpullPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
