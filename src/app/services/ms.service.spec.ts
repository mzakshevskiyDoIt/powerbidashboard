import { TestBed } from '@angular/core/testing';

import { MsService } from './ms.service';

describe('MsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsService = TestBed.get(MsService);
    expect(service).toBeTruthy();
  });
});
