import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinPage } from './magasin.page';

describe('MagasinPage', () => {
  let component: MagasinPage;
  let fixture: ComponentFixture<MagasinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagasinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagasinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
