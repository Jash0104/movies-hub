import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { authGuard } from './guards';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

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
        path: "details/:id",
        canActivate: [authGuard],
        component: MovieDetailsComponent
      }
    ]
  },
];
