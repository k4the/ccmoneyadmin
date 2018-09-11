import { YearlyMonthly } from './yearly-monthly.model';

export class YearlyMonthlyMapper {
  constructor() {}

  mapYearlyMonthlyFromJson(json: any): YearlyMonthly {
    const yearlyMonthly = {
      yearly: json.yearly,
      monthly: json.monthly
    };
    return new YearlyMonthly(yearlyMonthly);
  }

  mapYearlyMonthlyToJson(yearlyMonthly: YearlyMonthly): any {
    return {
      yearly: yearlyMonthly.yearly ? yearlyMonthly.yearly : 0,
      monthly: yearlyMonthly.monthly ? yearlyMonthly.monthly : 0
    };
  }
}
