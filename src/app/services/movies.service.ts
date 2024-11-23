import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {  
  private apiUrl = "http://localhost:3000/api"
  private token = localStorage.getItem('auth');
  
  constructor(
    private http: HttpClient
  ) {}
  
  getMovieDetails(id: string): Observable<Movies> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    
    return this.http.get<Movies>(`${this.apiUrl}/movies/${id}`, { headers })
  }
}
