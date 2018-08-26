import { Keys } from './../../global.constants';
import { ProductLabels, ProductMessages } from '../products.constants';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isLoggedIn = false;
  totalProducts = 0;
  productMessages = ProductMessages;
  productLabels = ProductLabels;
  keys = Keys;
  showDelete = false;
  title: string = null;
  message: string = null;
  type: string = null;
    productToDeleteId: string = null;

  private productsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public productsService: ProductsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productsService.getProducts();
    this.productsSub = this.productsService
      .getProductUpdateListener()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
    this.isLoggedIn = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      });
  }

  addProduct(): void {
    this.router.navigate(['/products/create']);
  }

  openDeleteModal(product: Product): void {
    this.title = this.productLabels.deleteProduct;
    this.message = this.productMessages.deleteSure + ' ' + product.name;
    this.type = this.keys.danger;
    this.productToDeleteId = product.id;
    this.showDelete = true;
  }

  deleteProduct(item: any): void {
    this.closeDelete();
    if (item.result) {
      this.productsService.deleteProduct(item.id);
    }
    this.productToDeleteId = null;
  }

  closeDelete(): void {
    this.showDelete = false;
    this.productToDeleteId = null;
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
