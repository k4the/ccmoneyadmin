import { Company } from '../companies/company.model';
import { Fuel } from './fuel.model';

export class Product {
  id?: string;
  name: string;
  isDual: boolean;
  hasGas: boolean;
  hasElectricity: boolean;
  isGreen: boolean;
  isTopPick: boolean;
  cashback: number;
  earlyExitFee: number;
  message: string;
  discountRate: boolean;
  rateType: string;
  company: Company;
  gas: Fuel;
  electricity: Fuel;

  constructor(product: Product) {
    this.id = product.id ? product.id : null;
    this.name = product.name;
    this.isDual = product.isDual;
    this.hasGas = product.hasGas,
    this.hasElectricity = product.hasElectricity,
    this.isGreen = product.isGreen ? product.isGreen : false;
    this.isTopPick = product.isTopPick ? product.isTopPick : false;
    this.cashback = product.cashback ? product.cashback : 0;
    this.earlyExitFee = product.earlyExitFee ? product.earlyExitFee : 0;
    this.discountRate = product.discountRate;
    this.rateType = product.rateType;
    this.message = product.message;
    this.company = product.company ? new Company(product.company) : null;
    this.gas = product.gas ? new Fuel(product.gas) : null;
    this.electricity = product.electricity ? new Fuel(product.electricity) : null;
  }
}
