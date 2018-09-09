import { CcModalModule } from './../cc-modal/cc-modal.module';
import { CcLoadingModule } from './../cc-loading/cc-loading.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CustomerSignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CcSingleSelectModule } from '../cc-single-select/cc-single-select.module';

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
    LoginComponent,
    CustomerSignupComponent,
    CustomerListComponent
  ]
})
export class CustomerModule { }
