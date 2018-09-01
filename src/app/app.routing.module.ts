import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'companies', loadChildren: './companies/companies.module#CompaniesModule'},
  { path: 'products', loadChildren: './products/products.module#ProductsModule'},
  { path: 'users', loadChildren: './auth/auth.module#AuthModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
