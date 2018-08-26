import { CompanyMapper } from './company.mapper';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CcModalComponent } from './cc-modal/cc-modal.component';
import { CcSelectComponent } from './cc-select/cc-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CompaniesRoutingModule
  ],
  declarations: [
    CompanyCreateComponent, CompanyListComponent, CcModalComponent, CcSelectComponent
  ],
  providers: [CompanyMapper]
})
export class CompaniesModule { }
