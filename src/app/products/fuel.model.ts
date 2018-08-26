import { Pricing } from './pricing.model';

export class Fuel {
  id?: string;
  name: string;
  pricing: Pricing;

  constructor(fuel: Fuel) {
    this.id = fuel.id ? fuel.id : null;
    this.name = fuel.name;
    this.pricing = fuel.pricing ? new Pricing(fuel.pricing) : null;
  }
}
