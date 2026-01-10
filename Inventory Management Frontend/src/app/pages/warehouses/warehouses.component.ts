import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  template: `
  <h2>Warehouses</h2>

  <form [formGroup]="form" (ngSubmit)="save()" class="form-grid">
    <mat-form-field appearance="outline">
      <mat-label>Name</mat-label>
      <input matInput formControlName="name" required>
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Location</mat-label>
      <input matInput formControlName="location">
    </mat-form-field>

    <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
      {{ editingId ? 'Update' : 'Add' }} Warehouse
    </button>
    <button *ngIf="editingId" mat-button type="button" (click)="reset()">Cancel</button>
  </form>

  <table mat-table [dataSource]="warehouses" class="mat-elevation-z2 full-table">
    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef> Name </th>
      <td mat-cell *matCellDef="let w">{{ w.name }}</td>
    </ng-container>

    <ng-container matColumnDef="location">
      <th mat-header-cell *matHeaderCellDef> Location </th>
      <td mat-cell *matCellDef="let w">{{ w.location || '-' }}</td>
    </ng-container>

    <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef> Actions </th>
      <td mat-cell *matCellDef="let w">
        <button mat-button (click)="edit(w)">Edit</button>
        <button mat-button color="warn" (click)="remove(w.id)">Delete</button>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="columns"></tr>
    <tr mat-row *matRowDef="let row; columns: columns;"></tr>
  </table>
  `,
  styles: [`
    .form-grid { display: grid; grid-template-columns: 1fr 1fr auto auto; gap: 12px; align-items: center; margin: 12px 0 24px; }
    .full-table { width: 100%; }
  `]
})
export class WarehousesComponent implements OnInit {
  warehouses: any[] = [];
  columns = ['name', 'location', 'actions'];
  editingId: number | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    location: ['']
  });

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void { this.load(); }

  load() { this.api.getWarehouses().subscribe((w: any) => this.warehouses = w); }

  edit(w: any) {
    this.editingId = w.id;
    this.form.setValue({ name: w.name, location: w.location ?? '' });
  }

  reset() {
    this.editingId = null;
    this.form.reset({ name: '', location: '' });
  }

  save() {
    const v = this.form.value;
    if (this.editingId) {
      this.reset(); this.load();
    } else {
      this.api.createWarehouse({ name: v.name, location: v.location || null })
        .subscribe(() => { this.reset(); this.load(); });
    }
  }

  remove(id: number) {
    if (!confirm('Delete this warehouse?')) return;
    this.load();
  }
}
