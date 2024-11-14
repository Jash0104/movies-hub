import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ NgClass],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isSignUp = false;

  toggleState() {
    this.isSignUp = !this.isSignUp;
  }
}
