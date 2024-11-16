import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

import { AuthService } from '../services/auth.service';
import { CreatedUser, SignInUser, User } from '../interfaces/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  icons = {
    warning: faCircleExclamation
  }

  isSignUp = true;

  toggleState() {
    this.isSignUp = !this.isSignUp;
    this.sessionForm.markAsUntouched()
  }

  sessionForm = new FormGroup({
    firstName: this.isSignUp ? new FormControl('', [Validators.required]) : new FormGroup(''),
    lastName: this.isSignUp ? new FormControl('', [Validators.required]) : new FormGroup(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  onSubmit() {
    this.sessionForm.markAllAsTouched()

    const { email, password, firstName, lastName } = this.sessionForm.value

    if ( this.isSignUp ) {
      if ( this.sessionForm.valid ) {

        if ( !(email && password && firstName && lastName )) {
          return // TODO: Mostrar mensaje de error
        }

        const user = {
          email,
          password,
          firstName,
          lastName
        }

        this.signUp( user )

      }
    } else {
      // Verificar que email y password no tengan errores
      if ( !(this.email?.errors || this.password?.errors) ) {
        if (!(email && password)) {
          return
        }
        this.signIn(email, password)
      }

    }
  }

  private signUp (user: User) {
    this.authService.signUp({
      ...user
    }).subscribe({
      next: ({ email, password }: SignInUser) => {
        this.signIn( email, password )
      }
    })
  }

  private signIn (email: string, password: string) {
    this.authService.signIn({
      email,
      password
    }).subscribe({
      next: ({ token, ...user }: CreatedUser) => {
        console.log(token);
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('auth', token)
        // this.router.navigateByUrl('app')
      }
    })
  }

  get email() {
    return this.sessionForm.get('email');
  }

  get password() {
    return this.sessionForm.get('password');
  }

  get firstName() {
    return this.sessionForm.get('firstName');
  }

  get lastName() {
    return this.sessionForm.get('lastName');
  }


}
