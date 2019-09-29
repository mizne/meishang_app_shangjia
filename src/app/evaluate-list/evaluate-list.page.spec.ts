import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateListPage } from './evaluate-list.page';

describe('EvaluateListPage', () => {
  let component: EvaluateListPage;
  let fixture: ComponentFixture<EvaluateListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
