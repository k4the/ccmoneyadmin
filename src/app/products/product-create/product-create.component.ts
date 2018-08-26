import { Fuel } from './../fuel.model';
import { ProductMessages, ProductLabels } from '../products.constants';
import { Keys, ErrorMessages } from './../../global.constants';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { ProductMapper } from '../product.mapper';
import { Pricing } from '../pricing.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product;
  productMessages = ProductMessages;
  productLabels = ProductLabels;
  private mode = Keys.create;
  private productId: string = null;

  constructor(
    public productsService: ProductsService,
    public productMapper: ProductMapper,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.mode = Keys.edit;
        this.productId = paramMap.get('productId');
        this.productsService
          .getProduct(this.productId)
          .subscribe(productData => {
            this.product = this.productMapper.mapFromJson(productData);
          });
      } else {
        this.mode = Keys.create;
        this.productId = null;
        this.product = null;
      }
    });
  }

  onSaveProduct(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    let product: Product = null;
    let id: string = null;
    let gasId: string = null;
    let electricityId: string = null;
    let gasPricingId: string = null;
    let electricityPricingId: string = null;
    let gas: Fuel = null;
    let electricity: Fuel = null;

    if (this.mode === Keys.edit) {
      id = this.productId;
      if (form.value.hasGas && product.gas.id) {
        gasId = product.gas.id;
        gasPricingId = product.gas.pricing.id;
        gas = this.setGasFuel(form, gasId, gasPricingId);
      }
      if (form.value.hasElectricity && product.electricity.id) {
        electricityId = product.electricity.id;
        electricityPricingId = product.electricity.pricing.id;
        electricity = this.setElectricityFuel(
          form,
          electricityId,
          electricityPricingId
        );
      }
      if (form.value.hasGas && !product.gas.id) {
        gasId = null;
        gasPricingId = null;
        gas = this.setGasFuel(form, gasId, gasPricingId);
      }
      if (form.value.hasElectricity && !product.electricity.id) {
        electricityId = null;
        electricityPricingId = null;
        electricity = this.setElectricityFuel(
          form,
          electricityId,
          electricityPricingId
        );
      }
    } else {
      id = null;
      if (form.value.hasGas) {
        gasId = null;
        gasPricingId = null;
        gas = this.setGasFuel(form, gasId, gasPricingId);
      }
      if (form.value.hasElectricity) {
        electricityId = null;
        electricityPricingId = null;
        electricity = this.setElectricityFuel(
          form,
          electricityId,
          electricityPricingId
        );
      }
    }
    product = {
      id: id,
      name: form.value.name,
      isDual: form.value.isDual,
      hasGas: form.value.hasGas,
      hasElectricity: form.value.hasElectricity,
      isGreen: form.value.isGreen,
      isTopPick: form.value.isTopPick,
      cashback: form.value.isCashback,
      earlyExitFee: form.value.earlyExitFee,
      message: form.value.message,
      discountRate: form.value.discountRate,
      rateType: form.value.rateType,
      company: form.value.company,
      gas: gas,
      electricity: electricity
    };
    if (this.mode === Keys.create) {
      this.productsService.addProduct(product);
    } else {
      this.productsService.updateProduct(this.productId, product);
    }
    form.resetForm();
  }

  private setGasFuel(form: any, fuelId: string, pricingId: string): Fuel {
    return {
      id: fuelId,
      name: form.value.gas.name,
      pricing: {
        id: pricingId,
        costYearly: form.value.gas.costYearly,
        costMonthly: form.value.gas.costMonthly,
        economy7: form.value.gas.economy7,
        unitRate: form.value.gas.unitRate,
        discountRate: form.value.gas.discountRate,
        standingCharge: form.value.gas.standingCharge
      }
    };
  }

  private setElectricityFuel(
    form: any,
    fuelId: string,
    pricingId: string
  ): Fuel {
    return {
      id: fuelId,
      name: form.value.electricity.name,
      pricing: {
        id: pricingId,
        costYearly: form.value.electricity.costYearly,
        costMonthly: form.value.electricity.costMonthly,
        economy7: form.value.electricity.economy7,
        unitRate: form.value.electricity.unitRate,
        discountRate: form.value.electricity.discountRate,
        standingCharge: form.value.electricity.standingCharge
      }
    };
  }
}
