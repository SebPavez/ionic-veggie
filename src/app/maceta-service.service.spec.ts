import { TestBed } from '@angular/core/testing';

import { MacetaServiceService } from './maceta-service.service';

describe('MacetaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MacetaServiceService = TestBed.get(MacetaServiceService);
    expect(service).toBeTruthy();
  });
});
