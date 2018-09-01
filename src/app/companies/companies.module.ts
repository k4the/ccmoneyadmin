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
import { CompanyLoadingComponent } from './company-loading/company-loading.component';
import { FilterPipe} from './filter.pipe';
import { StarRatingComponent } from './star-rating/star-rating.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CompaniesRoutingModule
  ],
  declarations: [
    CompanyCreateComponent,
    CompanyListComponent,
    CcModalComponent,
    CcSelectComponent,
    CompanyLoadingComponent,
    FilterPipe,
    StarRatingComponent
  ],
  providers: [CompanyMapper]
})
export class CompaniesModule { }
