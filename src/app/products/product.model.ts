import { Company } from '../companies/company.model';
import { Fuel } from './fuel.model';

export class Product {
  id?: string;
  name: string;
  totalYearlyCost: number;
  hasBoth: boolean;
  hasGas: boolean;
  hasElectricity: boolean;
  isGreen: boolean;
  isTopPick: boolean;
  cashback: number;
  earlyExitFee: number;
  rateType: string;
  fixedFor: number;
  paymentMethod: string;
  message: string;
  company: Company;
  gas: Fuel;
  electricity: Fuel;

  constructor(product: Product) {
    this.id = product.id ? product.id : null;
    this.name = product.name;
    this.totalYearlyCost = product.totalYearlyCost;
    this.hasBoth = product.hasBoth;
    this.hasGas = product.hasGas,
    this.hasElectricity = product.hasElectricity,
    this.isGreen = product.isGreen ? product.isGreen : false;
    this.isTopPick = product.isTopPick ? product.isTopPick : false;
    this.cashback = product.cashback ? product.cashback : 0;
    this.earlyExitFee = product.earlyExitFee ? product.earlyExitFee : 0;
    this.rateType = product.rateType;
    this.fixedFor = product.fixedFor;
    this.paymentMethod = product.paymentMethod;
    this.message = product.message;
    this.company = product.company ? new Company(product.company) : null;
    this.gas = product.gas ? new Fuel(product.gas) : null;
    this.electricity = product.electricity ? new Fuel(product.electricity) : null;
  }
}
