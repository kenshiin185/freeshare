import { TestBed } from '@angular/core/testing';

import { FrmCurrentServiceService } from './frm-current-service.service';

describe('FrmCurrentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FrmCurrentServiceService = TestBed.get(FrmCurrentServiceService);
    expect(service).toBeTruthy();
  });
});
