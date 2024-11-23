import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  const user = localStorage.getItem('user')
  const token = localStorage.getItem('auth')

  if (token && user) {
    return true
  }

  router.navigateByUrl('/login', {
    info: {
        title: 'Authentication error',
        message: 'You have to login to access that route',
        type: 'error'
    }
  })

  return false;
};
