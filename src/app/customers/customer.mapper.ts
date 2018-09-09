import { Product } from './../products/product.model';
import { Customer, Paying, YearlyMonthly } from './customer.model';

export class CustomerMapper {
  constructor() {}

  mapCustomerFromJson(json: any): Customer {
    const customer = {
      id: json._id,
      email: json.email,
      password: json.password,
      firstName: json.firstName,
      lastName: json.lastName ? json.lastName : null,
      paying: json.paying ? json.paying : null,
      product: json.product ? json.product : null
    };
    return new Customer(customer);
  }

  mapCustomerToJson(customer: Customer): any {
    return {
      _id: customer.id ? customer.id : null,
      email: customer.email,
      password: customer.password,
      firstName: customer.firstName,
      lastName: customer.lastName ? customer.lastName : null,
      paying: customer.paying ? customer.paying : null,
      product: customer.product ? customer.product : null
    };
  }
}
