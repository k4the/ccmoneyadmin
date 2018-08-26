import { Keys } from './../../global.constants';
import { CompanyLabels, CompanyMessages } from '../companies.constants';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from '../company.model';
import { CompaniesService } from '../companies.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies: Company[] = [];
  isLoggedIn = false;
  totalCompanies = 0;
  companyMessages = CompanyMessages;
  companyLabels = CompanyLabels;
  keys = Keys;
  showDelete = false;
  title: string = null;
  message: string = null;
  type: string = null;
    companyToDeleteId: string = null;

  private companiesSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public companiesService: CompaniesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.companiesService.getCompanies();
    this.companiesSub = this.companiesService
      .getCompanyUpdateListener()
      .subscribe((companies: Company[]) => {
        this.companies = companies;
      });
    this.isLoggedIn = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      });
  }

  addCompany(): void {
    this.router.navigate(['/companies/create']);
  }

  openDeleteModal(company: Company): void {
    this.title = this.companyLabels.deleteCompany;
    this.message = this.companyMessages.deleteSure + ' ' + company.name;
    this.type = this.keys.danger;
    this.companyToDeleteId = company.id;
    this.showDelete = true;
  }

  deleteCompany(item: any): void {
    this.closeDelete();
    if (item.result) {
      this.companiesService.deleteCompany(item.id);
    }
    this.companyToDeleteId = null;
  }

  closeDelete(): void {
    this.showDelete = false;
    this.companyToDeleteId = null;
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
