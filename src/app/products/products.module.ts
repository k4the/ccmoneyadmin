import { ProductMapper } from './product.mapper';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ProductSelectComponent } from './product-select/product-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductCreateComponent, ProductListComponent, ProductModalComponent, ProductSelectComponent
  ],
  providers: [ProductMapper]
})
export class ProductsModule { }
