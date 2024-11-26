import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCircleExclamation, faClapperboard, faVideo } from '@fortawesome/free-solid-svg-icons'

import { CreatedUser, SignInUser, ToastMessage, User } from '@/app/interfaces';
import { AuthService, ToastService } from '@/app/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, FontAwesomeModule ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getPreviousRouterInfo()
  }

  handleErrors( message: string, title: string ) {
    this.toastService.showToast({
      type: 'error',
      title,
      message
    })
  }

  //* HANDLE SIGN-IN AND SIGN-UP
  getPreviousRouterInfo() {
    const previousRouterInfo = this.router.lastSuccessfulNavigation?.extras.info
    if ( previousRouterInfo ) {
      const errorInfo = previousRouterInfo as ToastMessage
      this.handleErrors( errorInfo.message, errorInfo.title )
    }
  }

  isSignUp = false;

  toggleState() {
    this.isSignUp = !this.isSignUp;
    this.sessionForm.markAsUntouched()
  }

  onSubmit() {
    this.sessionForm.markAllAsTouched()

    const { email, password, firstName, lastName } = this.sessionForm.value

    if ( this.isSignUp ) {
      if ( this.sessionForm.valid ) {

        if ( !(email && password && firstName && lastName )) {
          return
        }

        const user = {
          email,
          password,
          name: firstName,
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
      },
      error: (error) => {
        this.handleErrors( Array.isArray(error.error.message) ? error.error.message[0] : error.error.message, 'Opps...' )
      }
    })
  }

  private signIn (email: string, password: string) {
    this.authService.signIn({
      email,
      password
    }).subscribe({
      next: ({ token, ...user }: CreatedUser) => {

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('auth', token)
        this.router.navigateByUrl('movies', {
          info: {
            title: `Welcome ${ user.name }`,
            type: 'success'
          }
        })
      },
      error: (error) => {
        this.handleErrors( Array.isArray(error.error.message) ? error.error.message[0] : error.error.message, 'Opps...' )
      }
    })
  }



  //* VARIABLES USED IN THE TEMPLATE
  icons = {
    warning: faCircleExclamation,
    logo: faVideo
  }

  sessionForm = new FormGroup({
    firstName: !this.isSignUp ? new FormControl('', [Validators.required]) : new FormGroup(''),
    lastName: !this.isSignUp ? new FormControl('', [Validators.required]) : new FormGroup(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

 //* GETTERS FOR FORM PROPERTIES
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
