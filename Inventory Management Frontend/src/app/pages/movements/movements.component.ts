import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule
  ],
  template: `
  <h2>Stock Movements</h2>

  <form [formGroup]="form" (ngSubmit)="submit()" class="form-grid">
    <mat-form-field appearance="outline">
      <mat-label>Type</mat-label>
      <mat-select formControlName="type" required (selectionChange)="onTypeChange()">
        <mat-option value="in">IN (Receive)</mat-option>
        <mat-option value="out">OUT (Issue)</mat-option>
        <mat-option value="transfer">TRANSFER</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Product</mat-label>
      <mat-select formControlName="productId" required>
        <mat-option *ngFor="let p of products" [value]="p.id">{{ p.sku }} — {{ p.name }}</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field appearance="outline" *ngIf="showFrom()">
      <mat-label>From Warehouse</mat-label>
      <mat-select formControlName="fromWarehouseId" >
        <mat-option *ngFor="let w of warehouses" [value]="w.id">{{ w.name }}</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field appearance="outline" *ngIf="showTo()">
      <mat-label>To Warehouse</mat-label>
      <mat-select formControlName="toWarehouseId" >
        <mat-option *ngFor="let w of warehouses" [value]="w.id">{{ w.name }}</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Quantity</mat-label>
      <input matInput type="number" formControlName="quantity" required min="1">
    </mat-form-field>

    <mat-form-field appearance="outline" class="note">
      <mat-label>Note (optional)</mat-label>
      <input matInput formControlName="note">
    </mat-form-field>

    <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Submit Movement</button>
  </form>

  <p class="hint">
    IN → only <strong>To Warehouse</strong> required. |
    OUT → only <strong>From Warehouse</strong> required. |
    TRANSFER → <strong>From + To</strong> required.
  </p>
  `,
  styles: [`
    .form-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; align-items: center; margin: 12px 0 12px; }
    .form-grid .note { grid-column: 1 / -1; }
    .hint { color: #555; margin-top: 8px; }
  `]
})
export class MovementsComponent implements OnInit {
  products: any[] = [];
  warehouses: any[] = [];

  form = this.fb.group({
    type: ['in', Validators.required],
    productId: [null, Validators.required],
    fromWarehouseId: [null],
    toWarehouseId: [null],
    quantity: [1, [Validators.required, Validators.min(1)]],
    note: ['']
  });

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe((p: any) => this.products = p);
    this.api.getWarehouses().subscribe((w: any) => this.warehouses = w);
  }

  onTypeChange() {
    const t = this.form.value.type;
    if (t === 'in') { this.form.get('fromWarehouseId')!.setValue(null); }
    else if (t === 'out') { this.form.get('toWarehouseId')!.setValue(null); }
  }

  showFrom() { const t = this.form.value.type; return t === 'out' || t === 'transfer'; }
  showTo()   { const t = this.form.value.type; return t === 'in'  || t === 'transfer'; }

  submit() {
    const v = this.form.value;
    this.api.postMovement(v).subscribe(() => {
      alert('Movement saved.');
      const keepType = this.form.value.type;
      this.form.reset({ type: keepType, productId: null, fromWarehouseId: null, toWarehouseId: null, quantity: 1, note: '' });
    }, err => alert(err?.error ?? 'Error'));
  }
}
