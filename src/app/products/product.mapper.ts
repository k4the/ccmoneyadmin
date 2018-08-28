import { Product } from './product.model';
import { PollRating } from './../companies/poll-rating.model';
import { Fuel } from './fuel.model';
import { Company } from '../companies/company.model';

export class ProductMapper {
  constructor() {}

  mapProductFromJson(json: any): Product {
    const product = {
      id: json._id,
      name: json.name,
      totalYearlyCost: json.totalYearlyCost,
      fuelType: json.fuelType ? json.fuelType : null,
      hasBoth: json.hasBoth,
      hasGas: json.hasGas,
      hasElectricity: json.hasElectricity,
      isGreen: json.isGreen ? json.isGreen : false,
      isTopPick: json.isTopPick ? json.isTopPick : false,
      cashback: json.cashback,
      earlyExitFee: json.earlyExitFee,
      discountRate: json.discountRate,
      rateType: json.rateType,
      fixedFor: json.fixedFor,
      paymentMethod: json.paymentMethod,
      message: json.message ? json.message : null,
      company: json.company ? this.mapCompanyFromJson(json.company) : null,
      gas: json.gas ? this.mapFuelFromJson(json.gas) : null,
      electricity: json.electricity ? this.mapFuelFromJson(json.electricity) : null,
    };
    return new Product(product);
  }

  mapProductToJson(product: Product): any {
    return {
      _id: product.id ? product.id : null,
      name: product.name,
      totalYearlyCost: product.totalYearlyCost ? product.totalYearlyCost : 0,
      fuelType: product.fuelType ? product.fuelType : null,
      hasBoth: product.hasBoth,
      hasGas: product.hasGas,
      hasElectricity: product.hasElectricity,
      isGreen: product.isGreen ? product.isGreen : false,
      isTopPick: product.isTopPick ? product.isTopPick : false,
      cashback: product.cashback,
      earlyExitFee: product.earlyExitFee,
      rateType: product.rateType,
      fixedFor: product.fixedFor,
      paymentMethod: product.paymentMethod,
      message: product.message ? product.message : null,
      company: product.company ? this.mapCompanyToJson(product.company) : null,
      gas: product.gas ? this.mapFuelToJson(product.gas) : null,
      electricity: product.electricity ? this.mapFuelToJson(product.electricity) : null,
    };
  }

  mapCompanyFromJson(json: any): Company {
    const company = {
      id: json._id,
      name: json.name,
      logoUrl: json.logoUrl,
      message: json.message ? json.message : null,
      warningMessage: json.warningMessage ? json.warningMessage : null,
      regions: json.regions ? json.regions : [],
      isBig: json.isBig,
      pollRating: json.pollRating ? this.mapPollRatingFromJson(json.pollRating) : null
    };
    return new Company(company);
  }

  mapCompanyToJson(company: Company): any {
    return {
      _id: company.id ? company.id : null,
      name: company.name,
      logoUrl: company.logoUrl,
      message: company.message ? company.message : null,
      warningMessage: company.warningMessage ? company.warningMessage : null,
      regions: company.regions ? company.regions : [],
      isBig: company.isBig,
      pollRating: company.pollRating ? this.mapPollRatingToJson(company.pollRating) : null
    };
  }

  mapPollRatingFromJson(json: any): PollRating {
    const pollRating = {
      great: json.great ? json.great : 0,
      ok: json.ok ? json.ok : 0,
      poor: json.poor ? json.poor : 0,
      total: json.total ? json.total : 0,
      feedbackMessage: json.feedbackMessage ? json.feedbackMessage : null,
      limitedFeedbackMessage: json.limitedFeedbackMessage ? json.limitedFeedbackMessage : null
    };
    return new PollRating(pollRating);
  }

  mapPollRatingToJson(pollRating: PollRating): any {
    return {
      great: pollRating.great ? pollRating.great : 0,
      ok: pollRating.ok ? pollRating.ok : 0,
      poor: pollRating.poor ? pollRating.poor : 0,
      total: pollRating.total ? pollRating.total : 0,
      feedbackMessage: pollRating.feedbackMessage ? pollRating.feedbackMessage : null,
      limitedFeedbackMessage: pollRating.limitedFeedbackMessage ? pollRating.limitedFeedbackMessage : null
    };
  }

  mapFuelFromJson(json: any): Fuel {
    const fuel = {
      yearlyCost: json.yearlyCost,
      costMonthly: json.costMonthly ? json.costMonthly : null,
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
      costMonthly: fuel.costMonthly ? fuel.costMonthly : null,
      economy7: fuel.economy7,
      unitRate: fuel.unitRate,
      discountRate: fuel.discountRate ? fuel.discountRate : null,
      standingCharge: fuel.standingCharge ? fuel.standingCharge : null
    };
  }
}
