import { Keys } from './../../global.constants';
import { CompanyLabels, CompanyMessages, CompanyCreateUrl } from '../companies.constants';
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
  isLoading = false;
  searchText = '';

  private authStatusSub: Subscription;

  constructor(
    public companiesService: CompaniesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCompanies();
    this.isLoggedIn = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      });
  }

  getCompanies = () => {
    this.isLoading = true;
    this.companiesService.getCompanies().subscribe(
      data => {
        this.companies = [...data];
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  };

  addCompany(): void {
    this.router.navigate([CompanyCreateUrl]);
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
      this.isLoading = true;
      this.companiesService.deleteCompany(item.id).subscribe(
        data => {
          const updatedCompanies = this.companies.filter(
            company => company.id !== item.id
          );
          this.companies = [...updatedCompanies];
          this.isLoading = false;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }
    this.companyToDeleteId = null;
  }

  closeDelete(): void {
    this.showDelete = false;
    this.companyToDeleteId = null;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
