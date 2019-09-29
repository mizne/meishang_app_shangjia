import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSecondPage } from './type-second.page';

describe('TypeSecondPage', () => {
  let component: TypeSecondPage;
  let fixture: ComponentFixture<TypeSecondPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeSecondPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSecondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
