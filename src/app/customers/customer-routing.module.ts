import { CustomerListComponent } from './customer-list/customer-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CustomerCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:customerId', component: CustomerCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerRoutingModule { }
