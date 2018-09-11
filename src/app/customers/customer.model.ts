import { Product } from '../products/product.model';
import { YearlyMonthly } from './yearly-monthly.model';

export class Customer {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  paying: Paying;
  product: Product;

  constructor(customer: Customer) {
    this.id = customer.id ? customer.id : null;
    this.email = customer.email ? customer.email : null;
    this.password = customer.password ? customer.password : null;
    this.firstName = customer.firstName ? customer.firstName : null;
    this.lastName = customer.lastName ? customer.lastName : null;
    this.paying = customer.paying ? new Paying(customer.paying) : null;
    this.product = customer.product ? new Product(customer.product) : null;
  }
}

export class Paying {
  currentlyPaying: YearlyMonthly;
  couldBePaying: YearlyMonthly;
  saving: YearlyMonthly;

  constructor(paying: Paying) {
    this.couldBePaying = paying.couldBePaying ? new YearlyMonthly(paying.couldBePaying) : null;
    this.currentlyPaying = paying.currentlyPaying ? new YearlyMonthly(paying.currentlyPaying) : null;
    this.saving = paying.saving ? new YearlyMonthly(paying.saving) : null;
  }
}
