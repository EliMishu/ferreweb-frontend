import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const routeCaseInsensitiveGuard: CanActivateFn = (route, state) => {
  const originalPath = state.url;
  const router = inject(Router);
  const lowerCasePath = originalPath.toLowerCase();

  if (originalPath !== lowerCasePath) {
    router.navigateByUrl(lowerCasePath);
    return false;
  }
  
  router.navigateByUrl(originalPath);
  return true;
};
