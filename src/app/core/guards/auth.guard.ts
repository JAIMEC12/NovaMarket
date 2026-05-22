import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environment/environment';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem(environment.tokenKey);
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
