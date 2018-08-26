import { Product } from './product.model';
import { Pricing } from './pricing.model';
import { PollRating } from './../companies/poll-rating.model';
import { Fuel } from './fuel.model';
import { Company } from '../companies/company.model';

export class ProductMapper {
  constructor() {}

  mapFromJson(json: any): Product {
    const product = {
      id: json._id,
      name: json.name,
      isDual: json.isDual,
      hasGas: json.hasGas,
      hasElectricity: json.hasElectricity,
      isGreen: json.isGreen ? json.isGreen : false,
      isTopPick: json.isTopPick ? json.isTopPick : false,
      message: json.message ? json.message : null,
      cashback: json.cashback,
      earlyExitFee: json.earlyExitFee,
      discountRate: json.discountRate,
      rateType: json.rateType,
      company: json.company ? this.mapCompanyFromJson(json.company) : null,
      gas: json.gas ? this.mapFuelFromJson(json.gas) : null,
      electricity: json.electricity ? this.mapFuelFromJson(json.electricity) : null,
    };
    return new Product(product);
  }

  mapToJson(product: Product): any {
    return {
      _id: product.id ? product.id : null,
      name: product.name,
      isDual: product.isDual,
      hasGas: product.hasGas,
      hasElectricity: product.hasElectricity,
      isGreen: product.isGreen ? product.isGreen : false,
      isTopPick: product.isTopPick ? product.isTopPick : false,
      message: product.message ? product.message : null,
      cashback: product.cashback,
      earlyExitFee: product.earlyExitFee,
      discountRate: product.discountRate,
      rateType: product.rateType,
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
      forumUrl: json.forumUrl ? json.forumUrl : null,
      message: json.message ? json.message : null,
      warningMessage: json.warningMessage ? json.warningMessage : null,
      regions: json.regions,
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
      forumUrl: company.forumUrl ? company.forumUrl : null,
      message: company.message ? company.message : null,
      warningMessage: company.warningMessage ? company.warningMessage : null,
      regions: company.regions,
      isBig: company.isBig,
      pollRating: company.pollRating ? this.mapPollRatingToJson(company.pollRating) : null
    };
  }

  mapPollRatingFromJson(json: any): PollRating {
    const pollRating = {
      id: json._id,
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
      _id: pollRating.id ? pollRating.id : null,
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
      id: json._id,
      name: json.name,
      pricing: json.pricing ? json.pricing : null
    };
    return new Fuel(fuel);
  }

  mapFuelToJson(fuel: Fuel): any {
    return {
      _id: fuel.id ? fuel.id : null,
      name: fuel.name,
      pricing: fuel.pricing ? this.mapPricingToJson(fuel.pricing) : null
    };
  }

  mapPricingFromJson(json: any): Pricing {
    const pricing = {
      id: json._id,
      costYearly: json.costYearly,
      costMonthly: json.costMonthly ? json.costMonthly : null,
      economy7: json.economy7,
      unitRate: json.unitRate,
      discountRate: json.discountRate ? json.discountRate : null,
      standingCharge: json.standingCharge ? json.standingCharge : null
    };
    return new Pricing(pricing);
  }

  mapPricingToJson(pricing: Pricing): any {
    return {
      _id: pricing.id,
      costYearly: pricing.costYearly,
      costMonthly: pricing.costMonthly ? pricing.costMonthly : null,
      economy7: pricing.economy7,
      unitRate: pricing.unitRate,
      discountRate: pricing.discountRate ? pricing.discountRate : null,
      standingCharge: pricing.standingCharge ? pricing.standingCharge : null
    };
  }
}
