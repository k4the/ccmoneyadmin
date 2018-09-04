import { CcLoadingModule } from './../cc-loading/cc-loading.module';
import { CcSelectModule } from './../cc-select/cc-select.module';
import { CcModalModule } from './../cc-modal/cc-modal.module';
import { CompanyMapper } from './company.mapper';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { CompaniesRoutingModule } from './companies-routing.module';
import { FilterPipe} from './filter.pipe';
import { StarRatingComponent } from './star-rating/star-rating.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CompaniesRoutingModule,
    CcModalModule,
    CcSelectModule,
    CcLoadingModule
  ],
  declarations: [
    CompanyCreateComponent,
    CompanyListComponent,
    FilterPipe,
    StarRatingComponent
  ],
  providers: [CompanyMapper]
})
export class CompaniesModule { }
