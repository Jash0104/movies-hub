
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Movie } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  private apiUrl = "http://localhost:3000/api"
  
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`, {
      headers: {
        Authorization: this.authService.Auth
      }
    })
  }
    
  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`, {
      headers: {
        Authorization: this.authService.Auth
      }
    })
  }
  
  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/movies`, movie, {
      headers: {
        Authorization: this.authService.Auth
      }
    })
  }

  updateMovie(id: string, movie: Movie): Observable<Movie> {
    return this.http.patch<Movie>(`${this.apiUrl}/movies/${id}`, {
      ...movie
    }, {
      headers: {
        Authorization: this.authService.Auth
      }
    })
  }

  deleteMovie(id:string) {
    return this.http.delete<string>(`${this.apiUrl}/movies/${id}`, {
      headers: {
        Authorization: this.authService.Auth
      }
    })
  }
}
