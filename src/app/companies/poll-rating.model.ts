export class PollRating {
  great: number;
  ok: number;
  poor: number;
  total: number;
  feedbackMessage?: string;
  limitedFeedbackMessage?: string;

  constructor(pollRating: PollRating) {
    this.great = pollRating.great;
    this.ok = pollRating.ok;
    this.poor = pollRating.poor;
    this.total = pollRating.total;
    this.feedbackMessage = pollRating.feedbackMessage ? pollRating.feedbackMessage : null;
    this.limitedFeedbackMessage = pollRating.limitedFeedbackMessage ? pollRating.limitedFeedbackMessage : null;
  }
}
