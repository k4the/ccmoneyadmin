import { Fuel } from './../fuel.model';
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
  companies: Array<Company> = [];
  keys = Keys;
  product: Product = this.productsService.getEmptyProduct();
  productMessages = ProductMessages;
  productLabels = ProductLabels;
  isLoading = false;
  selectCompanyOpen = false;
  selectedCompany: Company = null;
  selectedCompanyLabel: String = this.productLabels.company;
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

  openSelectCompany(): void {
    this.selectCompanyOpen = !this.selectCompanyOpen;
  }

  setSelectedCompany(company: Company): void {
    this.selectCompanyOpen = false;
    this.product.company = company;
    this.selectedCompanyLabel = company.name;
  }

  setFuelItems(item: any): void {
    if (item.type === this.productLabels.gas) {
      this.product.gas = item.fuel;
    }
    if (item.type === this.productLabels.electricity) {
      this.product.electricity = item.fuel;
    }
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
          // this.product = this.productsService.getEmptyProduct();
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
        this.product = productData;
        this.isLoading = false;
        this.selectedCompanyLabel = this.product.company.name;
        this.selectedCompany = this.product.company;
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
      isDual: form.value.isDual,
      hasGas: form.value.hasGas,
      hasElectricity: form.value.hasElectricity,
      isGreen: form.value.isGreen,
      isTopPick: form.value.isTopPick,
      cashback: form.value.isCashback,
      earlyExitFee: form.value.earlyExitFee,
      message: form.value.message,
      paymentMethod: form.value.paymentMethod,
      rateType: form.value.rateType,
      fixedFor: form.value.fixedFor,
      company: form.value.company,
      gas: this.product.gas,
      electricity: this.product.electricity
    };
  }
}
