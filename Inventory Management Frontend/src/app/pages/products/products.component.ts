import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule
  ],
  template: `
  <h2>Products</h2>

  <form [formGroup]="form" (ngSubmit)="save()" class="form-grid">
    <mat-form-field appearance="outline">
      <mat-label>SKU</mat-label>
      <input matInput formControlName="sku" required>
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Name</mat-label>
      <input matInput formControlName="name" required>
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Unit Price</mat-label>
      <input matInput type="number" formControlName="unitPrice" required>
    </mat-form-field>

    <mat-slide-toggle formControlName="isActive">Active</mat-slide-toggle>

    <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
      {{ editingId ? 'Update' : 'Add' }} Product
    </button>
    <button *ngIf="editingId" mat-button type="button" (click)="reset()">Cancel</button>
  </form>

  <table mat-table [dataSource]="products" class="mat-elevation-z2 full-table">
    <ng-container matColumnDef="sku">
      <th mat-header-cell *matHeaderCellDef> SKU </th>
      <td mat-cell *matCellDef="let p">{{ p.sku }}</td>
    </ng-container>

    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef> Name </th>
      <td mat-cell *matCellDef="let p">{{ p.name }}</td>
    </ng-container>

    <ng-container matColumnDef="unitPrice">
      <th mat-header-cell *matHeaderCellDef> Unit Price </th>
      <td mat-cell *matCellDef="let p">{{ p.unitPrice }}</td>
    </ng-container>

    <ng-container matColumnDef="isActive">
      <th mat-header-cell *matHeaderCellDef> Active </th>
      <td mat-cell *matCellDef="let p">{{ p.isActive ? 'Yes' : 'No' }}</td>
    </ng-container>

    <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef> Actions </th>
      <td mat-cell *matCellDef="let p">
        <button mat-button (click)="edit(p)">Edit</button>
        <button mat-button color="warn" (click)="remove(p.id)">Delete</button>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="columns"></tr>
    <tr mat-row *matRowDef="let row; columns: columns;"></tr>
  </table>
  `,
  styles: [`
    .form-grid { display: grid; grid-template-columns: repeat(3, 1fr) auto auto; gap: 12px; align-items: center; margin: 12px 0 24px; }
    .full-table { width: 100%; }
  `]
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  columns = ['sku', 'name', 'unitPrice', 'isActive', 'actions'];
  editingId: number | null = null;

  form = this.fb.group({
    sku: ['', Validators.required],
    name: ['', Validators.required],
    unitPrice: [0, [Validators.required, Validators.min(0)]],
    isActive: [true]
  });

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void { this.load(); }

  load() { this.api.getProducts().subscribe((p: any) => this.products = p); }

  edit(p: any) {
    this.editingId = p.id;
    this.form.setValue({ sku: p.sku, name: p.name, unitPrice: p.unitPrice, isActive: p.isActive });
  }

  reset() {
    this.editingId = null;
    this.form.reset({ sku: '', name: '', unitPrice: 0, isActive: true });
  }

  save() {
    const v = this.form.value;
    if (this.editingId) {
      this.api.updateProduct(this.editingId, {
        sku: v.sku, name: v.name, unitPrice: Number(v.unitPrice), isActive: !!v.isActive
      }).subscribe(() => { this.reset(); this.load(); });
    } else {
      this.api.createProduct({ sku: v.sku, name: v.name, unitPrice: Number(v.unitPrice) })
        .subscribe(() => { this.reset(); this.load(); });
    }
  }

  remove(id: number) {
    if (!confirm('Delete this product?')) return;
    this.api.deleteProduct(id).subscribe(() => this.load());
  }
}
