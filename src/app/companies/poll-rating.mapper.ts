import { PollRating } from './poll-rating.model';

export class PollRatingMapper {
  constructor() {}

  mapFromJson(json: any): PollRating {
    const pollRating = {
      great: json.great ? json.great : 0,
      ok: json.ok ? json.ok : 0,
      poor: json.poor ? json.poor : 0,
      starClass: json.starClass ? json.starClass : null,
      greatPercentage: json.greatPercentage ? json.greatPercentage : 0,
      okPercentage: json.okPercentage ? json.okPercentage : 0,
      poorPercentage: json.poorPercentage ? json.poorPercentage : 0,
      totalVotes: json.totalVotes ? json.totalVotes : 0,
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
      starClass: pollRating.starClass ? pollRating.starClass : null,
      greatPercentage: pollRating.greatPercentage ? pollRating.greatPercentage : 0,
      okPercentage: pollRating.okPercentage ? pollRating.okPercentage : 0,
      poorPercentage: pollRating.poorPercentage ? pollRating.poorPercentage : 0,
      total: pollRating.totalVotes ? pollRating.totalVotes : 0,
      feedbackMessage: pollRating.feedbackMessage ? pollRating.feedbackMessage : null,
      limitedFeedbackMessage: pollRating.limitedFeedbackMessage ? pollRating.limitedFeedbackMessage : null
    };
  }
}
