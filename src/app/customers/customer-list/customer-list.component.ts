import { CustomerService } from './../customer.service';
import { Keys } from './../../global.constants';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Customer } from '../customer.model';
import { CustomerMessages } from '../customer.constants';
import { PageNames } from '../../pages/pages.constants';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  customers: Customer[] = [];
  isLoggedIn = false;
  totalCustomers = 0;
  keys = Keys;
  showDelete = false;
  title: string = null;
  message: string = null;
  type: string = null;
  customerToDeleteId: string = null;
  isLoading = false;
  searchText = '';
  customerMessages = CustomerMessages;
  customerWithProducts: any = null;
  pageNames: any = PageNames;

  private authStatusSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.getCustomers();
    this.isLoggedIn = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      });
  }

  getCustomerByIdWithProducts(): void {
    const id = '5b976b0d66542216d4f7ab06';
    this.isLoading = true;
    this.customerService.getCustomerByIdWithProducts(id, this.pageNames.results).subscribe(
      customerData => {
        this.customerWithProducts = { ...customerData };
        if (
          this.customerWithProducts.products &&
          this.customerWithProducts.products.length
        ) {
          if (
            this.customerWithProducts.customer.paying &&
            this.customerWithProducts.customer.paying.currentlyPaying &&
            this.customerWithProducts.customer.paying.currentlyPaying.yearly
          ) {
            for (
              let i = 0;
              i < this.customerWithProducts.products.length;
              i++
            ) {
              this.customerWithProducts.products[i].saving.monthly = this.customerWithProducts.customer.paying.currentlyPaying.monthly - this.customerWithProducts.products[i].totalMonthlyCost;
              this.customerWithProducts.products[i].saving.yearly = this.customerWithProducts.customer.paying.currentlyPaying.yearly - this.customerWithProducts.products[i].totalYearlyCost;
            }
          }
        }
        this.isLoading = false;
        console.log('cust', this.customerWithProducts);
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  getCustomers = () => {
    this.isLoading = true;
    this.customerService.getCustomers().subscribe(
      data => {
        this.customers = [...data];
        this.isLoading = false;
        console.log(this.customers);
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  };

  addCustomer(): void {
    this.router.navigate(['/customers/create']);
  }

  openDeleteModal(customer: Customer): void {
    if (this.customers.length > 1) {
      this.title = 'Delete customer';
      this.message = 'Are you sure you want to delete ' + customer.email;
      this.type = this.keys.danger;
      this.customerToDeleteId = customer.id;
      this.showDelete = true;
    }
  }

  deleteCustomer(item: any): void {
    this.closeDelete();
    if (item.result) {
      this.isLoading = true;
      this.customerService.deleteCustomer(item.id).subscribe(
        data => {
          const updatedCustomers = this.customers.filter(
            customer => customer.id !== item.id
          );
          this.customers = [...updatedCustomers];
          this.isLoading = false;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }
    this.customerToDeleteId = null;
  }

  closeDelete(): void {
    this.showDelete = false;
    this.customerToDeleteId = null;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
