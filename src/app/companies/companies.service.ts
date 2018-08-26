import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from './company.model';
import { CompanyMapper } from './company.mapper';

const companiesUrl = environment.apiUrl + '/companies/';

@Injectable({ providedIn: 'root' })
export class CompaniesService {

  constructor(
    private http: HttpClient,
    private companyMapper: CompanyMapper
  ) {}

  getCompanies(): Observable<Company[]> {
    const results = this.http.get<{ message: string; companies: Array<any> }>(companiesUrl);
    return results.pipe(
      map(companyData => {
        return companyData.companies.map(company => {
          return this.companyMapper.mapFromJson(company);
        });
      })
    )
  }

  addCompany(company: Company): Observable<any> {
    if (company) {
      company = this.companyMapper.mapToJson(company);
      const result = this.http.post<{ message: string; companyId: string }>(companiesUrl, company);
      return result.pipe(
        map(companyData => {
          company.id = companyData.companyId;
        })
      )
    }
  }

  updateCompany(companyId: string, company: Company): Observable<any> {
    if (company) {
      company = this.companyMapper.mapToJson(company);
      return this.http.put(companiesUrl + companyId, company);
    }
  }

  getCompany(id: string): Observable<any> {
    if (id) {
      const result = this.http.get<{}>(companiesUrl + id);
      return result.pipe(
        map(companyData => {
          return this.companyMapper.mapFromJson(companyData);
        })
      )
    }
  }

  deleteCompany(id: string): Observable<any> {
    if (id) {
      return this.http.delete<{}>(companiesUrl + id);
    }
  }
}
