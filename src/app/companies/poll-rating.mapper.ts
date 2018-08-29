import { PollRating } from './poll-rating.model';

export class PollRatingMapper {
  constructor() {}

  mapFromJson(json: any): PollRating {
    const pollRating = {
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
      greatPercentage: pollRating.greatPercentage ? pollRating.greatPercentage : 0,
      ok: pollRating.okPercentage ? pollRating.okPercentage : 0,
      poor: pollRating.poorPercentage ? pollRating.poorPercentage : 0,
      total: pollRating.totalVotes ? pollRating.totalVotes : 0,
      feedbackMessage: pollRating.feedbackMessage ? pollRating.feedbackMessage : null,
      limitedFeedbackMessage: pollRating.limitedFeedbackMessage ? pollRating.limitedFeedbackMessage : null
    };
  }
}
