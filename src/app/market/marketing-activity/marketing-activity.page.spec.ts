import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingActivityPage } from './marketing-activity.page';

describe('MarketingActivityPage', () => {
  let component: MarketingActivityPage;
  let fixture: ComponentFixture<MarketingActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingActivityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
