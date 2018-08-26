export class Pricing {
  id: string;
  costYearly: number;
  costMonthly?: number;
  economy7: number;
  unitRate: number;
  discountRate?: number;
  standingCharge?: number;

  constructor(pricing: Pricing) {
    this.id = pricing.id;
    this.costYearly = pricing.costYearly;
    this.costMonthly = pricing.costMonthly ? pricing.costMonthly : null;
    this.economy7 = pricing.economy7;
    this.unitRate = pricing.unitRate;
    this.discountRate = pricing.discountRate ? pricing.discountRate : null;
    this.standingCharge = pricing.standingCharge ? pricing.standingCharge : null;
  }
}
