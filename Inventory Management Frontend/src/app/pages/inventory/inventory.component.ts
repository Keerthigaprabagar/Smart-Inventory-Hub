import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <h2>Inventory</h2>
    <table mat-table [dataSource]="items" class="mat-elevation-z2 full-table">
      <ng-container matColumnDef="sku">
        <th mat-header-cell *matHeaderCellDef> SKU </th>
        <td mat-cell *matCellDef="let i">{{ i.productSku }}</td>
      </ng-container>

      <ng-container matColumnDef="productName">
        <th mat-header-cell *matHeaderCellDef> Product </th>
        <td mat-cell *matCellDef="let i">{{ i.productName }}</td>
      </ng-container>

      <ng-container matColumnDef="warehouseName">
        <th mat-header-cell *matHeaderCellDef> Warehouse </th>
        <td mat-cell *matCellDef="let i">{{ i.warehouseName }}</td>
      </ng-container>

      <ng-container matColumnDef="quantity">
        <th mat-header-cell *matHeaderCellDef> Qty </th>
        <td mat-cell *matCellDef="let i">{{ i.quantity }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns;"></tr>
    </table>
  `,
  styles: [`.full-table { width: 100%; }`]
})
export class InventoryComponent implements OnInit {
  items: any[] = [];
  columns = ['sku', 'productName', 'warehouseName', 'quantity'];

  constructor(private api: ApiService) {}
  ngOnInit(): void { this.api.getInventory().subscribe((x: any) => this.items = x); }
}
