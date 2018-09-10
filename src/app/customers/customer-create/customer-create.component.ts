import { YearlyMonthly } from './../customer.model';
import { ProductsService } from '../../products/products.service';
import { Keys } from '../../global.constants';
import { CustomerMessages, CustomerUrl } from '../customer.constants';
import { Customer, Paying } from '../customer.model';
import { CustomerService } from '../customer.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Product } from '../../products/product.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {
  isLoading = false;
  hasError = false;
  keys = Keys;
  customerMessages = CustomerMessages;
  customer;
  products: Array<Product> = [];
  customerId: string = null;
  selectedProduct: Product = null;
  selectedProductLabel: String = this.customerMessages.product;
  private mode = this.keys.create;

  constructor(
    public authService: AuthService,
    private customerService: CustomerService,
    private productsService: ProductsService,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('customerId')) {
        this.mode = this.keys.edit;
        this.customerId = paramMap.get('customerId');
      } else {
        this.mode = this.keys.create;
        this.customerId = null;
        this.customer = this.customerService.getEmptyCustomer();
      }
      this.getProducts();
    });
  }

  getCustomerById(): void {
    this.isLoading = true;
    this.mode = Keys.edit;
    this.customerService.getCustomer(this.customerId).subscribe(
      customerData => {
        this.customer = { ...customerData };
        this.isLoading = false;
        if( this.customer.product) {
          this.selectedProduct = this.customer.product;
          this.selectedProductLabel = this.customer.product.name;
        }
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  getProducts(): void {
    this.isLoading = true;
    this.productsService.getProducts().subscribe(
      data => {
        this.products = [...data];
        this.isLoading = false;
        if (this.mode === this.keys.edit) {
          this.getCustomerById();
        }
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  setSingleSelectedItems(item: any) {
    this.customer.product = item.data;
    this.customer.paying.currentlyPaying.yearly = item.data.totalYearlyCost;
    this.customer.paying.currentlyPaying.monthly = item.data.totalMonthlyCost;
  }

  onCancel(form: NgForm): void {
    form.resetForm();
  }

  onSave(form: NgForm): void {
    if (form.invalid || !this.customer.product) {
      return;
    }
    const customer: any = {
      firstName: form.value.firstName,
      lastName: form.value.lastName ? form.value.lastName : null,
      email: form.value.email ? form.value.email : null,
      password: form.value.password,
      paying: this.customer.paying,
      product: this.customer.product
    };
    let id: string = null;
    this.mode === this.keys.edit ? (id = this.customerId) : (id = null);
    this.isLoading = true;
    if (this.mode === Keys.create) {
      this.customer.id = null;
      this.customerService.addCustomer(customer).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate([CustomerUrl]);
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    } else {
      this.customerService.updateCustomer(this.customerId, customer).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate([CustomerUrl]);
        },
        err => {
          this.isLoading = false;
          console.log(err);
        }
      );
    }
    form.resetForm();
  }
}
