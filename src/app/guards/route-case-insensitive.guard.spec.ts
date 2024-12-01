import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routeCaseInsensitiveGuard } from './route-case-insensitive.guard';

describe('routeCaseInsensitiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routeCaseInsensitiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
