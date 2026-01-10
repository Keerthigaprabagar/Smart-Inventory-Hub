import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Login</h2>
    <div>
      <input [(ngModel)]="username" placeholder="Username">
      <input [(ngModel)]="password" type="password" placeholder="Password">
      <button (click)="login()">Login</button>
      <p>{{message}}</p>
      <a routerLink="/register">Register</a>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';
  constructor(private api: ApiService, private router: Router) {}
  login() {
    this.api.login({ username: this.username, password: this.password }).subscribe({
      next: () => { this.message = 'Login success'; this.router.navigate(['/']); },
      error: () => this.message = 'Invalid credentials'
    });
  }
}
