import { PollRating } from './poll-rating.model';

export class PollRatingMapper {
  constructor() {}

  mapFromJson(json: any): PollRating {
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

  mapToJson(pollRating: PollRating): any {
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
