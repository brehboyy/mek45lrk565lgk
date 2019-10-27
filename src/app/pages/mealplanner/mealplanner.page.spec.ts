import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealplannerPage } from './mealplanner.page';

describe('MealplannerPage', () => {
  let component: MealplannerPage;
  let fixture: ComponentFixture<MealplannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealplannerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealplannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
