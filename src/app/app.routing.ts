import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';

export const AppRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { name: 'home' }  },
  { path: 'companies', loadChildren: './companies/companies.module#CompaniesModule', data: { name: 'companies' } },
  { path: 'products', loadChildren: './products/products.module#ProductsModule', data: { name: 'products' } },
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule', data: { name: 'pages' } },
  { path: 'users', loadChildren: './auth/auth.module#AuthModule', data: { name: 'users' }  },
  { path: 'customers', loadChildren: './customers/customer.module#CustomerModule', data: { name: 'customers' }  },
  { path: '**', component: PageNotFoundComponent }
];
