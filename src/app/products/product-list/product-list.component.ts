import { Keys } from './../../global.constants';
import { ProductLabels, ProductMessages, ProductCreateUrl, ProductProperties } from '../products.constants';
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
  productProperties = ProductProperties;
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
  isLoading = false;
  sortAscYearlyCost = false;
  sortAscName = false;
  searchText = '';

  private authStatusSub: Subscription;

  constructor(
    public productsService: ProductsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
    this.isLoggedIn = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      });
  }

  sortProductsByProperty(property: any): void {
    if(property === this.productProperties.name) {
      if(this.sortAscName) {
        this.productsService.sortProducts(property, 'DESC', this.products);
      } else {
        this.productsService.sortProducts(property, 'ASC', this.products);
      }
      this.sortAscName = !this.sortAscName;
    }
    if(property === this.productProperties.totalYearlyCost) {
      if(this.sortAscYearlyCost) {
        this.productsService.sortProducts(property, 'DESC', this.products);
      } else {
        this.productsService.sortProducts(property, 'ASC', this.products);
      }
      this.sortAscYearlyCost = !this.sortAscYearlyCost;
    }
  }

  getProducts = () => {
    this.isLoading = true;
    this.productsService.getProducts().subscribe(
      data => {
        this.products = [...data];
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  };

  addProduct(): void {
    this.router.navigate([ProductCreateUrl]);
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
      this.isLoading = true;
      this.productsService.deleteProduct(item.id).subscribe(
        data => {
          const updatedProducts = this.products.filter(
            company => company.id !== item.id
          );
          this.products = [...updatedProducts];
          this.isLoading = false;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }
    this.productToDeleteId = null;
  }

  closeDelete(): void {
    this.showDelete = false;
    this.productToDeleteId = null;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
