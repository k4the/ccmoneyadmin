import { PollRating } from './../companies/poll-rating.model';
import { Company } from './../companies/company.model';
import { Fuel } from './fuel.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.model';
import { ProductMapper } from './product.mapper';
import { ProductUrl } from './products.constants';

const productsUrl = environment.apiUrl + ProductUrl + '/';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient, private productMapper: ProductMapper) {}

  sortProducts<T>(propName: keyof Product, order: "ASC" | "DESC", products: Array<Product>): void {
    products.sort((a, b) => {
        if (a[propName] < b[propName])
            return -1;
        if (a[propName] > b[propName])
            return 1;
        return 0;
    });
    if (order === 'DESC') {
      products.reverse();
    }
  }

  getProducts(): Observable<Product[]> {
    const results = this.http.get<{ message: string; products: Array<any> }>(
      productsUrl
    );
    return results.pipe(
      map(productData => {
        return productData.products.map(product => {
          return this.productMapper.mapProductFromJson(product);
        });
      })
    );
  }

  addProduct(product: Product): Observable<any> {
    if (product) {
      product = this.productMapper.mapProductToJson(product);
      const result = this.http.post<{ message: string; productId: string }>(
        productsUrl,
        product
      );
      return result.pipe(
        map(productData => {
          product.id = productData.productId;
        })
      );
    }
  }

  updateProduct(productId: string, product: Product): Observable<any> {
    if (product) {
      product = this.productMapper.mapProductToJson(product);
      return this.http.put(productsUrl + productId, product);
    }
  }

  getProduct(id: string): Observable<any> {
    if (id) {
      const result = this.http.get<{}>(productsUrl + id);
      return result.pipe(
        map(productData => {
          return this.productMapper.mapProductFromJson(productData);
        })
      );
    }
  }

  deleteProduct(id: string): Observable<any> {
    if (id) {
      return this.http.delete<{}>(productsUrl + id);
    }
  }

  getEmptyProduct(): Product {
    return {
      id: null,
      name: null,
      fuelType: null,
      totalYearlyCost: 0,
      totalMonthlyCost: 0,
      isGreen: false,
      isTopPick: false,
      cashback: 0,
      earlyExitFee: 0,
      message: null,
      paymentMethod: null,
      rateType: null,
      fixedFor: null,
      company: null,
      gas: this.getEmptyFuel(),
      electricity: this.getEmptyFuel()
    };
  }

  getEmptyFuel(): Fuel {
    return {
      yearlyCost: null,
      monthlyCost: null,
      economy7: null,
      unitRate: null,
      discountRate: null,
      standingCharge: null
    }
  }
}
