import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { Observable } from 'rxjs';
import { CreatedUser, SignInUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http:localhost:3000/api"

  constructor(
    private readonly http: HttpClient
  ) {}

  signUp(user: User): Observable<CreatedUser> {
    return this.http.post<CreatedUser>(`${this.apiUrl}/auth/create`, {
      user
    })
  }

  signIn({ email, password }: SignInUser): Observable<{ token: string }> {
    return this.http.post<{ token: string}>(`${this.apiUrl}/auth`, {
      email,
      password
    })
  }

  
}
