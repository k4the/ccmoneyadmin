import { CompanyMessages, CompanyLabels } from '../companies.constants';
import { Keys, ErrorMessages } from './../../global.constants';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CompaniesService } from '../companies.service';
import { Company } from '../company.model';
import { CompanyMapper } from '../company.mapper';
import { Regions } from '../data/regions';
import { PollRating } from '../poll-rating.model';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  company: Company;
  regions: Array<any> = [];
  companyMessages = CompanyMessages;
  companyLabels = CompanyLabels;
  selectedRegions: Array<string> = [];
  regionsError = false;
  private mode = Keys.create;
  private companyId: string = null;

  constructor(
    public companiesService: CompaniesService,
    public companyMapper: CompanyMapper,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.regions = Regions;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('companyId')) {
        this.mode = Keys.edit;
        this.companyId = paramMap.get('companyId');
        this.companiesService
          .getCompany(this.companyId)
          .subscribe(companyData => {
            this.company = this.companyMapper.mapFromJson(companyData);
            this.selectedRegions = this.company.regions;
          });
      } else {
        this.mode = Keys.create;
        this.companyId = null;
        this.company = null;
      }
    });
  }

  setSelectedRegions(regions: Array<string>): void {
    this.selectedRegions = regions;
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
    let pollRatingId: string = null;
    if (this.mode === Keys.edit) {
      id = this.companyId;
      pollRatingId = this.company.pollRating.id;
    }
    pollRating = {
      id: pollRatingId,
      great: form.value.great,
      ok: form.value.ok,
      poor: form.value.poor,
      total: form.value.total
    };
    company = {
      id: id,
      name: form.value.name,
      logoUrl: form.value.logoUrl,
      forumUrl: form.value.forumUrl,
      message: form.value.message,
      warningMessage: form.value.warningMesage,
      regions: this.selectedRegions,
      isBig: form.value.isBig,
      pollRating: pollRating
    };
    // this.companyMapper.mapToJson(company);
    if (this.mode === Keys.create) {
      this.companiesService.addCompany(company);
    } else {
      this.companiesService.updateCompany(this.companyId, company);
    }
    form.resetForm();
  }
}
