import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDialogPage } from './select-dialog.page';

describe('SelectDialogPage', () => {
  let component: SelectDialogPage;
  let fixture: ComponentFixture<SelectDialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDialogPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
