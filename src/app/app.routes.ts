import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { authGuard } from './guards';
import { MoviesGridComponent } from './components/movies-grid/movies-grid.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'movies',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "",
        component: MoviesGridComponent
      }
    ]
  },
];
