import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { MenuOption } from '../../interfaces';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [ RouterOutlet, NavbarComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {
  detailsComponent = false;

  constructor(
    private route: Router
  ){}

  p() {
    this.route.navigateByUrl("movies/details/:id")
    this.detailsComponent = true
  }
  
  menuItems: MenuOption[] = [
    {
      title: "Movies",
      path: "/movies"
    },
    {
      title: "Owned",
      path: "/my-movies"
    },
    {
      title: "Wish List",
      path: "/favorites"
    }
  ]


}
