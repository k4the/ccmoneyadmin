export class ResultPage {
  id?: string;
  hurray: string;
  youCanSave: string;
  sorted: string;

  constructor(resultsPage: ResultPage) {
    this.id = resultsPage.id ? resultsPage.id : null;
    this.hurray = resultsPage.hurray;
    this.youCanSave = resultsPage.youCanSave;
    this.sorted = resultsPage.sorted;
  }
}
