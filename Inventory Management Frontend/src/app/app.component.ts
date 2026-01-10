import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink,
    MatToolbarModule, MatButtonModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span class="app-title">Inventory Management</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/">Dashboard</a>
      <a mat-button routerLink="/products">Products</a>
      <a mat-button routerLink="/warehouses">Warehouses</a>
      <a mat-button routerLink="/inventory">Inventory</a>
      <a mat-button routerLink="/movements">Movements</a>
    </mat-toolbar>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .app-title { font-weight: 600; }
    .spacer { flex: 1 1 auto; }
    .container { padding: 16px; max-width: 1100px; margin: auto; }
    a[mat-button] { color: white; text-decoration: none; }
  `]
})
export class AppComponent {}
