import { Component, Input } from '@angular/core';
import { LoggedUser, MenuOption } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  user: LoggedUser | null = null
  menuState = false
  profileState = false
  currentPath: string = ""

  @Input() menuItems: MenuOption[] = []


  ngOnInit(): void {
    const user = this.authService.currentUser
    this.currentPath = this.router.url
    this.user = user
  }
}