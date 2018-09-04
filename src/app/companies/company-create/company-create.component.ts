import { CompanyMessages, CompanyLabels } from '../companies.constants';
import { Keys } from './../../global.constants';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { CompaniesService } from '../companies.service';
import { Company } from '../company.model';
import { CompanyMapper } from '../company.mapper';
import { Regions } from '../data/regions';
import { PollRating } from '../poll-rating.model';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {
  company: Company;
  regions: Array<any> = [];
  companyMessages = CompanyMessages;
  companyLabels = CompanyLabels;
  selectedRegions: Array<string> = [];
  regionsError = false;
  isLoading = false;
  private mode = Keys.create;
  private companyId: string = null;

  constructor(
    public companiesService: CompaniesService,
    public companyMapper: CompanyMapper,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.regions = Regions;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('companyId')) {
        this.companyId = paramMap.get('companyId');
        this.getCompanyById();
      } else {
        this.mode = Keys.create;
        this.companyId = null;
        this.company = null;
      }
    });
  }

  getCompanyById(): void {
    this.isLoading = true;
    this.mode = Keys.edit;
    this.companiesService.getCompany(this.companyId).subscribe(
      companyData => {
        this.company = companyData;
        this.selectedRegions = this.company.regions;
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  setSelectedRegions(regions: Array<string>): void {
    this.selectedRegions = regions;
  }

  onCancel(form: NgForm): void {
    form.resetForm();
    this.router.navigate(['/companies']);
  }

  onSaveCompany(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    if (this.selectedRegions.length === 0) {
      this.regionsError = true;
      return;
    }
    this.regionsError = false;
    let company: Company = null;
    let pollRating: PollRating = null;
    let id: string = null;
    pollRating = {
      great: form.value.great,
      ok: form.value.ok,
      poor: form.value.poor,
      greatPercentage: 0,
      okPercentage: 0,
      poorPercentage: 0,
      totalVotes: form.value.totalVotes
    };
    pollRating = this.companiesService.getCalculatedPollRating(pollRating);
    company = {
      id: id,
      name: form.value.name,
      logoUrl: form.value.logoUrl,
      message: form.value.message,
      warningMessage: form.value.warningMesage,
      regions: this.selectedRegions,
      isBig: form.value.isBig,
      pollRating: pollRating
    };
    this.isLoading = true;
    if (this.mode === Keys.create) {
      this.companiesService.addCompany(company).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/companies']);
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    } else {
      this.companiesService.updateCompany(this.companyId, company).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/companies']);
        },
        err => {
          this.isLoading = false;
          console.log(err);
        }
      );
    }
    form.resetForm();
  }
}
