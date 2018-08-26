import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from './company.model';
import { CompanyMapper } from './company.mapper';

const companiesUrl = environment.apiUrl + '/companies/';

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  private companies: Array<Company> = [];
  private companiesUpdated = new Subject<Company[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private companyMapper: CompanyMapper
  ) {}

  getCompanies() {
    this.http
      .get<{ message: string; companies: Array<any> }>(companiesUrl)
      .pipe(
        map(companyData => {
          return companyData.companies.map(company => {
            return this.companyMapper.mapFromJson(company);
          });
        })
      )
      .subscribe(transformedCompanies => {
        this.companies = transformedCompanies;
        this.companiesUpdated.next([...this.companies]);
      });
  }

  addCompany(company: Company) {
    if (company) {
      company = this.companyMapper.mapToJson(company);
      this.http
        .post<{ message: string; companyId: string }>(companiesUrl, company)
        .subscribe(responseData => {
          const id: string = responseData.companyId;
          company.id = id;
          this.companies.push(company);
          this.companiesUpdated.next([...this.companies]);
          this.router.navigate(['/companies']);
        });
    }
  }

  updateCompany(companyId: string, company: Company) {
    if (company) {
      company = this.companyMapper.mapToJson(company);
      this.http.put(companiesUrl + companyId, company).subscribe(response => {
        const updatedCompanies = [...this.companies];
        const oldCompanyIndex = updatedCompanies.findIndex(
          p => p.id === companyId
        );
        updatedCompanies[oldCompanyIndex] = company;
        this.companies = updatedCompanies;
        this.companiesUpdated.next([...this.companies]);
        this.router.navigate(['/companies']);
      });
    }
  }

  getCompany(id: string) {
    return this.http.get<{}>(companiesUrl + id);
  }

  deleteCompany(companyId: string) {
    this.http.delete(companiesUrl + companyId).subscribe(() => {
      const updatedCompanies = this.companies.filter(
        company => company.id !== companyId
      );
      this.companies = updatedCompanies;
      this.companiesUpdated.next([...this.companies]);
    });
  }

  getCompanyUpdateListener() {
    return this.companiesUpdated.asObservable();
  }
}
