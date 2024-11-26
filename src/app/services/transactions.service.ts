import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transactions.interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiUrl = "http://localhost:3000/api"

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
}
