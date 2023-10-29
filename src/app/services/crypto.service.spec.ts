import { TestBed } from '@angular/core/testing';

import { CryptoSService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
