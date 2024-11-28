import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { authGuard } from './guards';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesGridComponent } from './components/movies-grid/movies-grid.component';
import { MovieTransactionComponent } from './components/movie-transaction/movie-transaction.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import { MyMoviesComponent } from './components/my-movies/my-movies.component';
import { adminGuard } from './guards/admin.guard';

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
            canActivate: [authGuard],
            component: MovieTransactionComponent
          },
          {
            path: "",
            canActivate: [authGuard],
            component: MoviesGridComponent
          }
        ],
      },
      {
        path: 'create-movie',
        canActivate: [authGuard, adminGuard],
        component: CreateMovieComponent
      },
      {
        path: 'my-movies',
        component: MyMoviesComponent
      }
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

