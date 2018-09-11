import { environment } from './../../environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from '../auth/auth.model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerMapper } from './customer.mapper';
import { Customer, Paying } from './customer.model';
import { ProductMapper } from '../products/product.mapper';
import { CustomerEndPoints } from './customer.constants';

const customersUrl = environment.apiUrl + '/customers/';
const loginUrl = 'login';
const signupUrl = 'signup';

@Injectable({
  providedIn: 'root'
})
export class CustomerService implements OnInit {
  ngOnInit(): void {
    this.loggedInCustomer = null;
  }

  loggedInCustomer: Customer;

  private token: string = null;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private customerMapper: CustomerMapper,
    private productMapper: ProductMapper
  ) {}

  getCustomerByIdWithProducts(id: string): Observable<any> {
    const item: any = {
      customer: null,
      products: []
    };
    if (id) {
      const url: string = environment.apiUrl + CustomerEndPoints.customerWithProducts + id;
      const result = this.http.get<{
        message: string;
        customer: any;
        products: Array<any>;
      }>(url);
      return result.pipe(
        map(data => {
          if (data.products && data.products.length) {
            for (let i = 0; i < data.products.length; i++) {
              item.products.push(
                this.productMapper.mapProductFromJson(data.products[i])
              );
            }
          }
          item.customer = this.customerMapper.mapCustomerFromJson(
            data.customer
          );
          return item;
        })
      );
    }
  }

  getCustomers(): Observable<Customer[]> {
    const results = this.http.get<{ message: string; customers: Array<any> }>(
      customersUrl
    );
    return results.pipe(
      map(customerData => {
        return customerData.customers.map(customer => {
          return this.customerMapper.mapCustomerFromJson(customer);
        });
      })
    );
  }

  getCustomer(id: string): Observable<any> {
    if (id) {
      const result = this.http.get<{}>(customersUrl + id);
      return result.pipe(
        map(customerData => {
          return this.customerMapper.mapCustomerFromJson(customerData);
        })
      );
    }
  }

  deleteCustomer(id: string): Observable<any> {
    if (id) {
      return this.http.delete<{}>(customersUrl + id);
    }
  }

  autoAuthCustomer(): any {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  getToken(): string {
    return this.token;
  }

  getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  addCustomer(customer: Customer): Observable<any> {
    if (customer) {
      customer = this.customerMapper.mapCustomerToJson(customer);
      const result = this.http.post<{ message: string; customerId: string }>(
        customersUrl,
        customer
      );
      return result.pipe(
        map(customerData => {
          customer.id = customerData.customerId;
        })
      );
    }
  }

  updateCustomer(customerId: string, customer: Customer): Observable<any> {
    if (customer) {
      customer = this.customerMapper.mapCustomerToJson(customer);
      return this.http.put(customersUrl + customerId, customer);
    }
  }

  getLoggedInCustomer() {
    return this.loggedInCustomer;
  }

  login(auth: Auth): Observable<any> {
    if (auth) {
      const result = this.http.post<{
        token: string;
        expiresIn: number;
        customer: Customer;
      }>(customersUrl + loginUrl, auth);
      return result.pipe(
        map(response => {
          if (response.token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            const now = new Date();
            const expiresIn = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.token = response.token;
            this.saveAuthData(this.token, expiresIn);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.loggedInCustomer = response.customer;
          } else {
            this.isAuthenticated = false;
            this.authStatusListener.next(false);
          }
        })
      );
    }
  }

  logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/customers/login']);
  }

  private saveAuthData(token: string, expirationDate: Date): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  getEmptyCustomer(): Customer {
    return {
      id: null,
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      paying: this.getEmptyCurrentlyPaying(),
      product: null
    };
  }

  getEmptyCurrentlyPaying(): Paying {
    return {
      currentlyPaying: {
        yearly: 0,
        monthly: 0
      },
      couldBePaying: {
        yearly: 0,
        monthly: 0
      },
      saving: {
        yearly: 0,
        monthly: 0
      }
    };
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData(): any {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expiration)
    };
  }

  private setAuthTimer(expiresInDuration: number): void {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresInDuration * 1000);
  }
}
