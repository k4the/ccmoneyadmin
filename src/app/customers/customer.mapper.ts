import { ProductMapper } from './../products/product.mapper';
import { Customer, Paying } from './customer.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerMapper {
  constructor(
    private productMapper: ProductMapper
  ) {}

  mapCustomerFromJson(json: any): Customer {
    const customer = {
      id: json._id,
      email: json.email,
      password: json.password,
      firstName: json.firstName,
      lastName: json.lastName ? json.lastName : null,
      paying: json.paying ? this.mapPayingFromJson(json.paying) : null,
      product: json.product ? this.productMapper.mapProductFromJson(json.product) : null
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
      paying: customer.paying ? this.mapPayingToJson(customer.paying) : null,
      product: customer.product ? this.productMapper.mapProductToJson(customer.product) : null
    };
  }

  mapPayingFromJson(json: any): Paying {
    const paying = {
      currentlyPaying: json.currentlyPaying ? this.productMapper.mapYearlyMonthlyFromJson(json.currentlyPaying) : null,
      couldBePaying: json.couldBePaying ? this.productMapper.mapYearlyMonthlyFromJson(json.couldBePaying) : null,
      saving: json.saving ? this.productMapper.mapYearlyMonthlyFromJson(json.saving) : null
    };
    return new Paying(paying);
  }

  mapPayingToJson(paying: Paying): any {
    return {
      currentlyPaying: paying.currentlyPaying ? this.productMapper.mapYearlyMonthlyToJson(paying.currentlyPaying) : null,
      couldBePaying: paying.couldBePaying ? this.productMapper.mapYearlyMonthlyToJson(paying.couldBePaying) : null,
      saving: paying.saving ? this.productMapper.mapYearlyMonthlyToJson(paying.saving) : null
    };
  }
}
