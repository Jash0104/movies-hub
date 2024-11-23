
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Movie } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  private apiUrl = "http://localhost:3000/api"
  private token = localStorage.getItem('auth');
  
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  getMovies() {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`, {
      headers: {
        Authorization: this.authService.Auth
      }
    })
  }
    
  getMovieDetails(id: string): Observable<Movies> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    
    return this.http.get<Movies>(`${this.apiUrl}/movies/${id}`, { headers })
  }
}
