import { Product } from "../products/product.model";

export class Customer {
  email: string;
  password: string;
  id?: string;
  firstName: string;
  lastName: string;
  paying: Paying;
  product: Product;

  constructor(json: any) {
    this.email = json.email;
    this.password = json.password;
    this.id = json.id ? json.id : null;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.paying = json.paying ? new Paying(json.paying) : null;
    this.product = json.product ? new Product(json.product) : null;
  }
}

export class Paying {
  currentlyPaying: YearlyMonthly
  couldBePaying: YearlyMonthly
  saving: YearlyMonthly;

  constructor(json: any) {
    this.couldBePaying = json.couldBePaying ? new YearlyMonthly(json.couldBePaying) : null;
    this.currentlyPaying = json.currentlyPaying ? new YearlyMonthly(json.currentlyPaying) : null;
    this.saving = json.saving ? new YearlyMonthly(json.saving) : null;
  }
}

export class YearlyMonthly {
  yearly: number;
  monthly: number;

  constructor(json: any) {
    this.yearly = json.yearly;
    this.monthly = json.monthly;
  }
}
