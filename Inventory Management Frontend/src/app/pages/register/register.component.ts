import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Register</h2>
    <div>
      <input [(ngModel)]="username" placeholder="Username">
      <input [(ngModel)]="password" type="password" placeholder="Password">
      <button (click)="register()">Register</button>
      <p>{{message}}</p>
      <a routerLink="/login">Login</a>
    </div>
  `
})
export class RegisterComponent {
  username = '';
  password = '';
  message = '';
  constructor(private api: ApiService, private router: Router) {}
  register() {
    this.api.register({ username: this.username, password: this.password }).subscribe({
      next: () => { this.message = 'Registered'; this.router.navigate(['/login']); },
      error: (e) => this.message = e?.error ?? 'Error'
    });
  }
}
