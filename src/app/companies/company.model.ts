import { PollRating } from './poll-rating.model';

export class Company {
  id?: string;
  name: string;
  logoUrl: string;
  message?: string;
  warningMessage?: string;
  regions: Array<string>;
  isBig: boolean;
  pollRating?: PollRating;

  constructor(company: Company) {
    this.id = company.id ? company.id : null;
    this.name = company.name;
    this.logoUrl = company.logoUrl;
    this.message = company.message ? company.message : null;
    this.warningMessage = company.warningMessage ? company.warningMessage : null;
    this.regions = company.regions ? company.regions : [];
    this.isBig = company.isBig;
    this.pollRating = company.pollRating ? new PollRating(company.pollRating) : null;
  }
}
