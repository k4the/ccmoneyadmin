import { ResultsLabels } from './results.constants';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResultPage } from './result-page.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['../pages.component.scss']
})
export class ResultsComponent implements OnInit {
  isLoading = false;
  resultsLabels = ResultsLabels;
  results: ResultPage = null;

  constructor() {}

  ngOnInit() {
  }

  onCancel(form: NgForm): void {
    form.resetForm();
  }

  onSaveResults(form: NgForm): void {
    if (form.invalid) {
      return;
    }
  }
}
