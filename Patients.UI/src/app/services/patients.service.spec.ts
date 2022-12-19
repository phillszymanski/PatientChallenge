import { TestBed } from '@angular/core/testing';

import { PatientsService } from './patients.service';

describe('PatientsServiceService', () => {
  let service: PatientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
