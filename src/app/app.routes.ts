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
    path: 'app',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: "movies",
        pathMatch: "full"
      },
      {
        path: 'movies',
        canActivate: [authGuard],
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
            component: MovieTransactionComponent
          },
          {
            path: "",
            component: MoviesGridComponent
          }
        ],
      },
      {
        path: 'create-movie',
        component: CreateMovieComponent
      }
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];
