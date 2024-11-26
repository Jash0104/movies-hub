import { Component, Input } from '@angular/core';
import { LoggedUser, MenuOption } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '@/app/services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink, FontAwesomeModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {}

  icons = {
    logo: faVideo
  }

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

  onSignOut(): void {
    localStorage.removeItem("auth")
    localStorage.removeItem("user")

    // this.toastService.showToast({
    //   type: 'success',
    //   message: "See you soon!",
    //   title: "Sign out",
    //   duration: 2000
    // })
  }
}
