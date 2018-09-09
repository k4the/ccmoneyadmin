import { ProductsService } from './../../products/products.service';
import { Keys } from './../../global.constants';
import { CustomerMessages } from './../customer.constants';
import { Customer } from './../customer.model';
import { CustomerService } from './../customer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Product } from '../../products/product.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class CustomerSignupComponent implements OnInit, OnDestroy {
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
  private authStatusSub: Subscription;

  constructor(
    public authService: AuthService,
    private customerService: CustomerService,
    private productsService: ProductsService,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        console.log(authStatus);
        this.isLoading = false;
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          if (paramMap.has('customerId')) {
            this.mode = this.keys.edit;
            this.customerId = paramMap.get('customerId');
          } else {
            this.mode = this.keys.create;
            this.customerId = null;
          }
          this.getProducts();
        });
      }
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  getCustomerById(): void {
    this.isLoading = true;
    this.mode = Keys.edit;
    this.customerService.getCustomer(this.customerId).subscribe(
      customerData => {
        this.customer = { ...customerData };
        this.isLoading = false;
        this.selectedProduct = this.customer.product;
        this.selectedProductLabel = this.customer.product.name;
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
        } else {
          this.customer = new Customer(null);
        }
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  setSingleSelectedItems() {

  }

  onCancel(form: NgForm): void {
    form.resetForm();
  }

  onSave(form: NgForm): void {
    if (form.invalid ) {
      return;
    }
    const customer: any = {
      email: form.value.email,
      password: form.value.password,
      firstName: form.value.firstName,
      lastName: form.value.lastName ? form.value.lastName : null,
      paying: form.value.paying ? form.value.paying : null,
      product: form.value.product ? form.value.product : null
    };
    this.customerService.createCustomer(customer);
  }
}
