export class YearlyMonthly {
  yearly: number;
  monthly: number;

  constructor(yearlyMonthly: YearlyMonthly) {
    this.yearly = yearlyMonthly.yearly;
    this.monthly = yearlyMonthly.monthly;
  }
}
