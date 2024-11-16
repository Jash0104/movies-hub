import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ToastComponent } from './shared/toast/toast.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      
    ]
  }
];
