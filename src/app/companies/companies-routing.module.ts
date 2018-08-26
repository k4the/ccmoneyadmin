import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'create', component: CompanyCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:companyId', component: CompanyCreateComponent, canActivate: [AuthGuard] },
  { path: '', component: CompanyListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompaniesRoutingModule { }
