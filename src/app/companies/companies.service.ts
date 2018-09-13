import { PollRating } from './poll-rating.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from './company.model';
import { CompanyMapper } from './company.mapper';
import { CompanyUrl } from './companies.constants';

const companiesUrl = environment.apiUrl + CompanyUrl +  '/';

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
          return this.companyMapper.mapCompanyFromJson(company);
        });
      })
    );
  }

  addCompany(company: Company): Observable<any> {
    if (company) {
      company = this.companyMapper.mapCompanyToJson(company);
      const result = this.http.post<{ message: string; companyId: string }>(companiesUrl, company);
      return result.pipe(
        map(companyData => {
          company.id = companyData.companyId;
        })
      );
    }
  }

  updateCompany(companyId: string, company: Company): Observable<any> {
    if (company) {
      company = this.companyMapper.mapCompanyToJson(company);
      return this.http.put(companiesUrl + companyId, company);
    }
  }

  getCompany(id: string): Observable<any> {
    if (id) {
      const result = this.http.get<{}>(companiesUrl + id);
      return result.pipe(
        map(companyData => {
          return this.companyMapper.mapCompanyFromJson(companyData);
        })
      );
    }
  }

  deleteCompany(id: string): Observable<any> {
    if (id) {
      return this.http.delete<{}>(companiesUrl + id);
    }
  }

  getCalculatedPollRating(pollRating: PollRating): PollRating {
    const greatPercentage = (((pollRating.great * 2) + pollRating.ok) / (pollRating.totalVotes * 2)) * 100;
    const okPercentage = (pollRating.ok / pollRating.totalVotes) * 100;
    const poorPercentage = (pollRating.poor / pollRating.totalVotes) * 100;
    const calculatedPollRating = {
      great: pollRating.great,
      ok: pollRating.ok,
      poor: pollRating.poor,
      greatPercentage: greatPercentage,
      okPercentage: okPercentage,
      poorPercentage: poorPercentage,
      totalVotes: pollRating.totalVotes,
      starClass: null
    };
    calculatedPollRating.starClass = this.getStarRating(calculatedPollRating);
    return calculatedPollRating;
  }

  private getStarRating(pollRating: PollRating): string {
    let starClass;
    const numberOfStars = 5;
    if (!pollRating.totalVotes) {
      starClass = 'noStars';
    } else if (pollRating.totalVotes && pollRating.totalVotes < 24) {
      starClass = 'noStars';
    } else {
      const maxScore = pollRating.totalVotes * numberOfStars;
      const poorScore =
        pollRating.totalVotes * (pollRating.poorPercentage / 100);
      const okScore =
        pollRating.totalVotes * (pollRating.okPercentage / 100) * 3;
      const greatScore =
        pollRating.totalVotes * (pollRating.greatPercentage / 100) * 5;
      const totalScore = poorScore + okScore + greatScore;
      const n = (totalScore * numberOfStars) / maxScore;
      const stars = Math.round(n + 0.5) - 0.5;
      starClass = this.getStarClass(stars);
    }
    return starClass;
  }

  private getStarClass(starRating: number): string {
    switch (starRating) {
      case 1:
        return 'oneStar';
      case 1.5:
        return 'oneAndAHalfStars';
      case 2:
        return 'twoStars';
      case 2.5:
        return 'twoAndAHalfStars';
      case 3:
        return 'threeStars';
      case 3.5:
        return 'threeAndAHalfStars';
      case 4:
        return 'fourStars';
      case 4.5:
        return 'fourAndAHalfStars';
      case 5:
        return 'fiveStars';
      default:
        return 'noStars';
    }
  }
}
