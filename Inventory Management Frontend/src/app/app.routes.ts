import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { WarehousesComponent } from './pages/warehouses/warehouses.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { MovementsComponent } from './pages/movements/movements.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'warehouses', component: WarehousesComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'movements', component: MovementsComponent },
  { path: '**', redirectTo: '' }
];
