import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const AppRoutes: Routes = [
  { path: '', component: HomeComponent, data: { state: 'home', name: 'home' }  },
  { path: 'companies', loadChildren: './companies/companies.module#CompaniesModule', data: { state: 'companies', name: 'companies' } },
  { path: 'products', loadChildren: './products/products.module#ProductsModule', data: { state: 'products', name: 'products' } },
  { path: 'users', loadChildren: './auth/auth.module#AuthModule', data: { state: 'users', name: 'users' }  },
  { path: '**', component: PageNotFoundComponent }
];
