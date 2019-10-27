import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettePage } from './recette.page';

describe('RecettePage', () => {
  let component: RecettePage;
  let fixture: ComponentFixture<RecettePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecettePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecettePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
