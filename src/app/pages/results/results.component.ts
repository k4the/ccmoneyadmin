import { Keys } from './../../global.constants';
import { ImageFilter } from './../image-filter.model';
import { PagesService } from '../pages.service';
import { ResultsLabels } from './results.constants';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Page } from '../page.model';
import { Router } from '@angular/router';
import { PageNames } from '../pages.constants';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['../pages.component.scss']
})
export class ResultsComponent implements OnInit {
  isLoading = false;
  resultsLabels = ResultsLabels;
  results: Page = null;
  keys = Keys;
  currentCompany: ImageFilter = {
    heading: 'Stay with your current supplier',
    subHeading: 'Save up to',
    message:
      'We can get you another deal with your current supplier and handle the switch for you',
    filter: 'company',
    showSubHeading: false,
    isActive: true
  };
  bigCompany: ImageFilter = {
    heading: 'Switch to a big name supplier',
    subHeading: 'Save up to',
    message:
      'We can narrow your results to only show the big companies you may recognise',
    filter: 'isBig',
    showSubHeading: false,
    isActive: true
  };
  none: ImageFilter = {
    heading: 'Choose from our full range',
    subHeading: 'Save up to',
    message:
      'Choose from any of our deals for a simple, straightforward switch',
    filter: 'none',
    showSubHeading: false,
    isActive: true
  };

  constructor(private router: Router, private pagesService: PagesService) {}

  ngOnInit() {}

  onCancel(form: NgForm): void {
    form.resetForm();
  }

  onSaveResults(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const results: Page = {
      name: PageNames.results,
      heading: form.value.heading,
      subHeading: form.value.subHeading,
      hasPersonalProjection: false,
      personalProjectionMessage: form.value.personalProjectionMessage,
      fullRangeMessage: form.value.fullRangeMessage,
      imageFilters: []
    };

    this.pagesService.addPage(results).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }
}
