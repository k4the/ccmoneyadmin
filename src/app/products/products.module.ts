import { CcLoadingModule } from './../cc-loading/cc-loading.module';
import { CcToggleModule } from './../cc-toggle/cc-toggle.module';
import { CcSingleSelectModule } from './../cc-single-select/cc-single-select.module';
import { CcModalModule } from './../cc-modal/cc-modal.module';
import { ProductMapper } from './product.mapper';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FuelComponent } from './fuel/fuel.component';
import { ProductsFilterPipe} from './products-filter.pipe';
import { CcSelectModule } from '../cc-select/cc-select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductsRoutingModule,
    CcModalModule,
    CcSelectModule,
    CcSingleSelectModule,
    CcToggleModule,
    CcLoadingModule
  ],
  declarations: [
    ProductCreateComponent,
    ProductListComponent,
    FuelComponent,
    ProductsFilterPipe
  ],
  providers: [ProductMapper]
})
export class ProductsModule { }
