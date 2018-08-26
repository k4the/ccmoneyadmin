import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.model';
import { ProductMapper } from './product.mapper';

const productsUrl = environment.apiUrl + '/products/';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Array<Product> = [];
  private productsUpdated = new Subject<Product[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private productMapper: ProductMapper
  ) {}

  getProducts() {
    this.http
      .get<{ message: string; products: Array<any> }>(productsUrl)
      .pipe(
        map(productData => {
          return productData.products.map(product => {
            return this.productMapper.mapFromJson(product);
          });
        })
      )
      .subscribe(transformedProducts => {
        this.products = transformedProducts;
        this.productsUpdated.next([...this.products]);
      });
  }

  addProduct(product: Product) {
    if (product) {
      product = this.productMapper.mapToJson(product);
      this.http
        .post<{ message: string; productId: string }>(productsUrl, product)
        .subscribe(responseData => {
          const id: string = responseData.productId;
          product.id = id;
          this.products.push(product);
          this.productsUpdated.next([...this.products]);
          this.router.navigate(['/products']);
        });
    }
  }

  updateProduct(productId: string, product: Product) {
    if (product) {
      product = this.productMapper.mapToJson(product);
      this.http.put(productsUrl + productId, product).subscribe(response => {
        const updatedProducts = [...this.products];
        const oldProductIndex = updatedProducts.findIndex(
          p => p.id === productId
        );
        updatedProducts[oldProductIndex] = product;
        this.products = updatedProducts;
        this.productsUpdated.next([...this.products]);
        this.router.navigate(['/products']);
      });
    }
  }

  getProduct(id: string) {
    return this.http.get<{}>(productsUrl + id);
  }

  deleteProduct(productId: string) {
    this.http.delete(productsUrl + productId).subscribe(() => {
      const updatedProducts = this.products.filter(
        product => product.id !== productId
      );
      this.products = updatedProducts;
      this.productsUpdated.next([...this.products]);
    });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }
}
