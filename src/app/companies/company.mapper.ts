import { PollRating } from './poll-rating.model';
import { Company } from './company.model';

export class CompanyMapper {
  constructor() {}

  mapFromJson(json: any): Company {
    const company = {
      id: json._id,
      name: json.name,
      logoUrl: json.logoUrl,
      forumUrl: json.forumUrl ? json.forumUrl : null,
      message: json.message ? json.message : null,
      warningMessage: json.warningMessage ? json.warningMessage : null,
      regions: json.regions,
      isBig: json.isBig,
      pollRating: json.pollRating ? this.mapPollRatingFromJson(json.pollRating) : null
    };
    return new Company(company);
  }

  mapToJson(company: Company): any {
    console.log(company);
    return {
      _id: company.id ? company.id : null,
      name: company.name,
      logoUrl: company.logoUrl,
      forumUrl: company.forumUrl ? company.forumUrl : null,
      message: company.message ? company.message : null,
      warningMessage: company.warningMessage ? company.warningMessage : null,
      regions: company.regions,
      isBig: company.isBig,
      pollRating: company.pollRating ? this.mapPollRatingToJson(company.pollRating) : null
    };
  }

  mapPollRatingFromJson(json: any): PollRating {
    const pollRating = {
      great: json.great ? json.great : 0,
      ok: json.ok ? json.ok : 0,
      poor: json.poor ? json.poor : 0,
      total: json.total ? json.total : 0,
      feedbackMessage: json.feedbackMessage ? json.feedbackMessage : null,
      limitedFeedbackMessage: json.limitedFeedbackMessage ? json.limitedFeedbackMessage : null
    };
    return new PollRating(pollRating);
  }

  mapPollRatingToJson(pollRating: PollRating): any {
    return {
      great: pollRating.great ? pollRating.great : 0,
      ok: pollRating.ok ? pollRating.ok : 0,
      poor: pollRating.poor ? pollRating.poor : 0,
      total: pollRating.total ? pollRating.total : 0,
      feedbackMessage: pollRating.feedbackMessage ? pollRating.feedbackMessage : null,
      limitedFeedbackMessage: pollRating.limitedFeedbackMessage ? pollRating.limitedFeedbackMessage : null
    };
  }
}
