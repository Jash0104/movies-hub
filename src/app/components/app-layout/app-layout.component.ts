
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuOption, ToastMessage } from '../../interfaces';
import { AuthService, ToastService } from '@/app/services';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [ RouterOutlet, NavbarComponent, NgClass ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.authService.verifyToken().subscribe({
      error: (error) => {
        this.authService.handleAuthErrors( error )
      },
    })

    this.getPreviousRouterInfo()

    this.addAdminRoute()
  }

  get currentPath() {
    return this.router.url
  }

  get user() {
    return this.authService.currentUser
  }

  //* HANDLE SIGN-IN AND SIGN-UP
  getPreviousRouterInfo() {
    const previousRouterInfo = this.router.lastSuccessfulNavigation?.extras.info
    if ( previousRouterInfo ) {
      const info = previousRouterInfo as ToastMessage
      this.toastService.showToast({
        type: 'success',
        title: info.title,
        message: info.message
      })
    }
  }

  get actualPath () {
    return this.router.url
  }

  get title () {
    return this.menuItems.find(( item ) => item.path === this.router.url )?.title
  }

  
  menuItems: MenuOption[] = [
    {
      title: "Movies",
      path: "movies"
    },
    {
      title: "My movies",
      path: "my-movies"
    }
  ]

  addAdminRoute() {
    if ( this.authService.currentUser.role === "ADMIN" ) {
      this.menuItems.push({
        title: "Create Movie",
        path: "create-movie"
      })
    }
  }
}
