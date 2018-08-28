import { RateTypes, PaymentMethods, FuelTypes } from '../data/product-lists';
import {
  ProductMessages,
  ProductLabels,
  ProductUrl
} from '../products.constants';
import { Keys, ErrorMessages } from './../../global.constants';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { CompaniesService } from '../../companies/companies.service';
import { Company } from '../../companies/company.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  paymentMethods = PaymentMethods;
  rateTypes = RateTypes;
  fuelTypes = FuelTypes;
  companies: Array<Company> = [];
  keys = Keys;
  product: Product = null;
  productMessages = ProductMessages;
  productLabels = ProductLabels;
  isLoading = false;
  selectedCompany: Company = null;
  selectedCompanyLabel: String = this.productLabels.company;
  selectedRateTypeLabel: String = this.productLabels.rateType;
  selectedPaymentMethodLabel: String = this.productLabels.paymentMethod;
  selectedFuelTypeLabel: String = this.productLabels.fuelType;
  private mode = this.keys.create;
  private productId: string = null;

  constructor(
    public route: ActivatedRoute,
    private productsService: ProductsService,
    private companiesService: CompaniesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.mode = this.keys.edit;
        this.productId = paramMap.get('productId');
      } else {
        this.mode = this.keys.create;
        this.productId = null;
      }
      this.getCompanies();
    });
  }

  setSingleSelectedItems(item: any): void {
    console.log(item)
    if (item) {
      switch (item.label) {
        case this.productLabels.company:
          this.product.company = item.data;
          break;

        case this.productLabels.rateType:
          this.product.rateType = item.data.name;
          break;

        case this.productLabels.paymentMethod:
          this.product.paymentMethod = item.data.name;
          break;

        case this.productLabels.fuelType:
          switch (item.data.name) {
            case this.productLabels.gas:
              this.product.hasGas = true;
              this.product.hasElectricity = false;
              break;

            case this.productLabels.electricity:
              this.product.hasElectricity = true;
              this.product.hasGas = false;
              break;

            case this.productLabels.both:
              this.product.hasBoth = true;
              this.product.hasGas = true;
              this.product.hasElectricity = true;
              break;
          }
          break;
      }
    }
  }

  setToggleItem(item: any): void {
    if (item) {
      switch (item.label) {
        case this.productLabels.isGreen:
          this.product.isGreen = item.isOn;
          break;

        case this.productLabels.isTopPick:
          this.product.isTopPick = item.isOn;
          break;
      }
    }
  }

  setFuelItems(item: any): void {
    if (item.type === this.productLabels.gas) {
      this.product.gas = item.fuel;
    }
    if (item.type === this.productLabels.electricity) {
      this.product.electricity = item.fuel;
    }
  }

  getTotalYearlyCost() : number {
    let totalYearlyCost = 0;
    if(this.product.gas && this.product.gas.yearlyCost && this.product.electricity && this.product.electricity.yearlyCost) {
      totalYearlyCost = this.product.gas.yearlyCost + this.product.electricity.yearlyCost;
    }
    if((this.product.gas && this.product.gas.yearlyCost) && (!this.product.electricity || !this.product.electricity.yearlyCost)) {
      totalYearlyCost = this.product.gas.yearlyCost;
    }
    if((this.product.electricity && this.product.electricity.yearlyCost) && (!this.product.gas || !this.product.gas.yearlyCost)) {
      totalYearlyCost = this.product.electricity.yearlyCost;
    }
    return totalYearlyCost;
  }

  getCompanies(): void {
    this.isLoading = true;
    this.companiesService.getCompanies().subscribe(
      data => {
        this.companies = [...data];
        this.isLoading = false;
        if (this.mode === this.keys.edit) {
          this.getProductById();
        } else {
          this.product = this.productsService.getEmptyProduct();
        }
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  getProductById(): void {
    this.isLoading = true;
    this.mode = Keys.edit;
    this.productsService.getProduct(this.productId).subscribe(
      productData => {
        this.product = {...productData};
        console.log(this.product);
        this.isLoading = false;
        this.selectedCompany = this.product.company;
        this.selectedCompanyLabel = this.product.company.name;
        this.selectedRateTypeLabel = this.product.rateType;
        this.selectedPaymentMethodLabel = this.product.paymentMethod;
        if (this.product.hasElectricity && this.product.hasGas) {
          this.selectedFuelTypeLabel = this.productLabels.both;
        } else {
          if (this.product.hasElectricity) {
            this.selectedFuelTypeLabel = this.productLabels.electricity;
          } else {
            this.selectedFuelTypeLabel = this.productLabels.gas;
          }
        }
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  onCancel(form: NgForm): void {
    form.resetForm();
    this.router.navigate([ProductUrl]);
  }

  onSaveProduct(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    let product: Product = null;
    let id: string = null;
    this.mode === this.keys.edit ? (id = this.productId) : (id = null);
    product = this.setProduct(form, id);
    this.isLoading = true;
    if (this.mode === Keys.create) {
      this.productsService.addProduct(product).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate([ProductUrl]);
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    } else {
      this.productsService.updateProduct(this.productId, product).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate([ProductUrl]);
        },
        err => {
          this.isLoading = false;
          console.log(err);
        }
      );
    }
    form.resetForm();
  }

  private setProduct(form: NgForm, id: string): Product {
    return {
      id: id,
      name: form.value.name,
      fuelType: this.product.fuelType,
      totalYearlyCost: this.getTotalYearlyCost(),
      hasBoth: this.product.hasBoth,
      hasGas: this.product.hasGas,
      hasElectricity: this.product.hasElectricity,
      isGreen: this.product.isGreen,
      isTopPick: this.product.isTopPick,
      cashback: form.value.cashback,
      earlyExitFee: form.value.earlyExitFee,
      message: form.value.message,
      paymentMethod: this.product.paymentMethod,
      rateType: this.product.rateType,
      fixedFor: form.value.fixedFor,
      company: this.product.company,
      gas: this.product.gas,
      electricity: this.product.electricity
    };
  }
}
