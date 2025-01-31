import { TestBed } from '@angular/core/testing';

import { AggregatedDataService } from './aggregated-data.service';

describe('AggregatedDataService', () => {
  let service: AggregatedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AggregatedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
