import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { Observable } from 'rxjs';
import { AuthError, CreatedUser, LoggedUser, SignInUser } from '../interfaces/auth.interface';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:3000/api"

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  signUp(user: User): Observable<CreatedUser> {
    return this.http.post<CreatedUser>(`${this.apiUrl}/auth/create`, {
      ...user
    })
  }

  signIn({ email, password }: SignInUser): Observable<CreatedUser> {
    return this.http.post<CreatedUser>(`${this.apiUrl}/auth/`, {
      email,
      password
    })
  }

  verifyToken(): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.apiUrl}/auth` , {
      headers: {
        Authorization: this.Auth
      }
    })
  }

  handleAuthErrors( error: HttpErrorResponse ) {
    if ( error.status === 401 ) {
      this.router.navigateByUrl("/login")
      localStorage.clear()
      this.toastService.showToast({
        message: "Session has expired, please login again",
        title: "Session expired",
        type: 'error'
      })
    }

  }

  get currentUser() {
    const localUser = localStorage.getItem('user') || '{}'
    const user = JSON.parse(localUser)
    return user as LoggedUser
  }

  get Auth() {
    const auth = localStorage.getItem("auth")
    return `Bearer ${auth}`
  }


}
