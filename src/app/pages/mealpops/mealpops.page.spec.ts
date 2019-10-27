import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealpopsPage } from './mealpops.page';

describe('MealpopsPage', () => {
  let component: MealpopsPage;
  let fixture: ComponentFixture<MealpopsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealpopsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealpopsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
