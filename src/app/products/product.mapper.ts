import { CompanyMapper } from './../companies/company.mapper';
import { Product } from './product.model';
import { Fuel } from './fuel.model';
import { YearlyMonthly } from '../customers/yearly-monthly.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductMapper {
  constructor(
    private companyMapper: CompanyMapper
  ) {}

  mapProductFromJson(json: any): Product {
    const product = {
      id: json._id,
      name: json.name,
      totalYearlyCost: json.totalYearlyCost,
      totalMonthlyCost: json.totalMonthlyCost,
      fuelType: json.fuelType ? json.fuelType : null,
      isGreen: json.isGreen ? json.isGreen : false,
      isTopPick: json.isTopPick ? json.isTopPick : false,
      cashback: json.cashback,
      earlyExitFee: json.earlyExitFee,
      discountRate: json.discountRate,
      rateType: json.rateType,
      fixedFor: json.fixedFor,
      paymentMethod: json.paymentMethod,
      message: json.message ? json.message : null,
      endDate: json.endDate ? new Date(json.endDate) : null,
      company: json.company ? this.companyMapper.mapCompanyFromJson(json.company) : null,
      gas: json.gas ? this.mapFuelFromJson(json.gas) : null,
      electricity: json.electricity ? this.mapFuelFromJson(json.electricity) : null,
      saving: json.saving ? this.mapYearlyMonthlyFromJson(json.saving) : null
    };
    return new Product(product);
  }


  mapProductToJson(product: Product): any {
    return {
      _id: product.id ? product.id : null,
      name: product.name,
      totalYearlyCost: product.totalYearlyCost,
      totalMonthlyCost: product.totalMonthlyCost,
      fuelType: product.fuelType ? product.fuelType : null,
      isGreen: product.isGreen ? product.isGreen : false,
      isTopPick: product.isTopPick ? product.isTopPick : false,
      cashback: product.cashback,
      earlyExitFee: product.earlyExitFee,
      rateType: product.rateType,
      fixedFor: product.fixedFor,
      paymentMethod: product.paymentMethod,
      message: product.message ? product.message : null,
      endDate: product.endDate ? product.endDate : null,
      company: product.company ? this.companyMapper.mapCompanyToJson(product.company) : null,
      gas: product.gas ? this.mapFuelToJson(product.gas) : null,
      electricity: product.electricity ? this.mapFuelToJson(product.electricity) : null,
      saving: product.saving ? this.mapYearlyMonthlyToJson(product.saving) : null
    };
  }

  mapFuelFromJson(json: any): Fuel {
    const fuel = {
      yearlyCost: json.yearlyCost,
      monthlyCost: json.monthlyCost ? json.monthlyCost : null,
      economy7: json.economy7,
      unitRate: json.unitRate,
      discountRate: json.discountRate ? json.discountRate : null,
      standingCharge: json.standingCharge ? json.standingCharge : null
    };
    return new Fuel(fuel);
  }

  mapFuelToJson(fuel: Fuel): any {
    return {
      yearlyCost: fuel.yearlyCost,
      monthlyCost: fuel.monthlyCost ? fuel.monthlyCost : null,
      economy7: fuel.economy7,
      unitRate: fuel.unitRate,
      discountRate: fuel.discountRate ? fuel.discountRate : null,
      standingCharge: fuel.standingCharge ? fuel.standingCharge : null
    };
  }

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
