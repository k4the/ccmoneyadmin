import { CompanyMapper } from './../companies/company.mapper';
import { ProductMapper } from './../products/product.mapper';
import { CcModalModule } from './../cc-modal/cc-modal.module';
import { CcLoadingModule } from './../cc-loading/cc-loading.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { FormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CcSingleSelectModule } from '../cc-single-select/cc-single-select.module';
import { CustomerMapper } from './customer.mapper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomerRoutingModule,
    CcLoadingModule,
    CcModalModule,
    CcSingleSelectModule
  ],
  declarations: [
    CustomerCreateComponent,
    CustomerListComponent
  ],
  providers: [CustomerMapper, ProductMapper, CompanyMapper]
})
export class CustomerModule { }
