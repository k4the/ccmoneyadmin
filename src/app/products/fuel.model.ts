export class Fuel {
  yearlyCost: number;
  costMonthly?: number;
  economy7: number;
  unitRate: number;
  discountRate?: number;
  standingCharge?: number;

  constructor(fuel: Fuel) {
    this.yearlyCost = fuel.yearlyCost;
    this.costMonthly = fuel.costMonthly ? fuel.costMonthly : null;
    this.economy7 = fuel.economy7;
    this.unitRate = fuel.unitRate;
    this.discountRate = fuel.discountRate ? fuel.discountRate : null;
    this.standingCharge = fuel.standingCharge ? fuel.standingCharge : null;
  }
}
