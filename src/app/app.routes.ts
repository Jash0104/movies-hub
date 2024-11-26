import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { authGuard } from './guards';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesGridComponent } from './components/movies-grid/movies-grid.component';
import { MovieTransactionComponent } from './components/movie-transaction/movie-transaction.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';

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
    canActivate: [authGuard],
    component: AppLayoutComponent,
    children: [
      {
        path: ":id",
        canActivate: [authGuard],
        component: MovieDetailsComponent
      },
      {
        path: ":id/purchase",
        canActivate: [authGuard],
        component: MovieTransactionComponent
      },
      {
        path: ":id/rent",
        canActivate: [authGuard],
        component: MovieTransactionComponent
      },
      {
        path: "",
        canActivate: [authGuard],
        component: MoviesGridComponent
      },
    ],
  },
  {
    path: "create-movie",
    canActivate: [authGuard],
    component: CreateMovieComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];
