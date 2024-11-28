import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transactions.interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Movie } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiUrl = "https://movie-catalog-production-7b7a.up.railway.app/api"
  // private apiUrl = "http://localhost:3000/api"

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) {}

  createATransaction(transactionData: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transaction`, {
      ...transactionData
    }, 
    {
      headers: {
        Authorization: this.authService.Auth
      }
    })
  }

  getRentedMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/transaction/rent`, {
      headers: {
        Authorization: this.authService.Auth
      }
    })
  }

  getPurchasedMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/transaction/purchase`, {
      headers: {
        Authorization: this.authService.Auth
      }
    })
  }
}
