import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
  template: `
    <h2>Welcome 👋</h2>
    <p>Use these quick links:</p>
    <div class="grid">
      <a mat-raised-button color="primary" routerLink="/products">Manage Products</a>
      <a mat-raised-button color="primary" routerLink="/warehouses">Manage Warehouses</a>
      <a mat-raised-button color="primary" routerLink="/movements">Stock Movements</a>
      <a mat-raised-button color="primary" routerLink="/inventory">View Inventory</a>
    </div>
  `,
  styles: [`.grid { display: grid; grid-template-columns: repeat(2, 220px); gap: 12px; }`]
})
export class DashboardComponent {}
