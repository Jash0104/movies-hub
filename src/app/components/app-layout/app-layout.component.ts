import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
