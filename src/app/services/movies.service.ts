
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
}
