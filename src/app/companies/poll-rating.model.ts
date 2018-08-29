export class PollRating {
  greatPercentage: number;
  okPercentage: number;
  poorPercentage: number;
  totalVotes: number;
  feedbackMessage?: string;
  limitedFeedbackMessage?: string;

  constructor(pollRating: PollRating) {
    this.greatPercentage = pollRating.greatPercentage;
    this.okPercentage = pollRating.okPercentage;
    this.poorPercentage = pollRating.poorPercentage;
    this.totalVotes = pollRating.totalVotes;
    this.feedbackMessage = pollRating.feedbackMessage ? pollRating.feedbackMessage : null;
    this.limitedFeedbackMessage = pollRating.limitedFeedbackMessage ? pollRating.limitedFeedbackMessage : null;
  }
}
