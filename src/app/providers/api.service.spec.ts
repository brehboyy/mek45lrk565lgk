import { TestBed } from '@angular/core/testing';

import { APIservice } from './api.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIservice = TestBed.get(APIservice);
    expect(service).toBeTruthy();
  });
});
