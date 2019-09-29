import { TestBed, async, inject } from '@angular/core/testing';

import { AdGuardGuard } from './ad-guard.guard';

describe('AdGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdGuardGuard]
    });
  });

  it('should ...', inject([AdGuardGuard], (guard: AdGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
