import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeenSettledPage } from './been-settled.page';

describe('BeenSettledPage', () => {
  let component: BeenSettledPage;
  let fixture: ComponentFixture<BeenSettledPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeenSettledPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeenSettledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
