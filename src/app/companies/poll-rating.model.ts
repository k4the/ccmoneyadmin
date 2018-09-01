export class PollRating {
  great: number;
  ok: number;
  poor: number;
  greatPercentage: number;
  okPercentage: number;
  poorPercentage: number;
  totalVotes: number;
  starClass?: string;
  feedbackMessage?: string;
  limitedFeedbackMessage?: string;

  constructor(pollRating: PollRating) {
    this.great = pollRating.great ? pollRating.great : 0;
    this.ok = pollRating.ok ? pollRating.ok : 0;
    this.poor = pollRating.poor ? pollRating.poor : 0;
    this.greatPercentage = pollRating.greatPercentage ? pollRating.greatPercentage : 0;
    this.okPercentage = pollRating.okPercentage ? pollRating.okPercentage : 0;
    this.poorPercentage = pollRating.poorPercentage ? pollRating.poorPercentage : 0;
    this.totalVotes = pollRating.totalVotes ? pollRating.totalVotes : 0;
    this.starClass = pollRating.starClass ? pollRating.starClass : null;
    this.feedbackMessage = pollRating.feedbackMessage ? pollRating.feedbackMessage : null;
    this.limitedFeedbackMessage = pollRating.limitedFeedbackMessage ? pollRating.limitedFeedbackMessage : null;
  }
}
