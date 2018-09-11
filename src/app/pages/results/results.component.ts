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
  imageFilterCurrentCompany: ImageFilter = {
    heading: 'Stay with your current supplier',
    subHeading: 'Save up to',
    message:
      'We can get you another deal with your current supplier and handle the switch for you',
    filter: 'company',
    showSubHeading: false,
    isActive: true
  };
  imageFilterBigCompany: ImageFilter = {
    heading: 'Switch to a big name supplier',
    subHeading: 'Save up to',
    message:
      'We can narrow your results to only show the big companies you may recognise',
    filter: 'isBig',
    showSubHeading: false,
    isActive: true
  };
  imageFilterNone: ImageFilter = {
    heading: 'Choose from our full range',
    subHeading: 'Save up to',
    message:
      'Choose from any of our deals for a simple, straightforward switch',
    filter: 'none',
    showSubHeading: false,
    isActive: true
  };
  mode: string = this.keys.create;

  constructor(private router: Router, private pagesService: PagesService) {}

  ngOnInit() {
    this.pagesService.deletePage('5b97a8c9a6918028c831b4ca').subscribe();

    this.isLoading = true;
    this.pagesService.getPage(PageNames.results).subscribe(
      page => {
        this.isLoading = false;
        if (page) {
          this.results = { ...page };
          this.mode = this.keys.edit;
        }
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  setImageFilter(item: any): void {
    if (item) {
      switch (item.type) {
        case this.keys.bigCompany:
          this.imageFilterBigCompany.isActive = item.isOn;
          break;

        case this.keys.currentCompany:
          this.imageFilterCurrentCompany.isActive = item.isOn;
          break;

        case this.keys.none:
          this.imageFilterNone.isActive = item.isOn;
          break;
      }
    }
  }

  onCancel(form: NgForm): void {
    form.resetForm();
  }

  onSaveResults(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    let id: string = null;

    if (this.mode === this.keys.edit) {
      id = this.results.id;
    }

    const results: Page = {
      id: id,
      name: PageNames.results,
      heading: form.value.heading,
      subHeading: form.value.subHeading ? form.value.subHeading : null,
      hasPersonalProjection: false,
      personalProjectionMessage: form.value.personalProjectionMessage
        ? form.value.personalProjectionMessage
        : null,
      fullRangeMessage: form.value.fullRangeMessage
        ? form.value.fullRangeMessage
        : null,
      imageFilterCurrentCompany: this.imageFilterCurrentCompany,
      imageFilterBigCompany: this.imageFilterBigCompany,
      imageFilterNone: this.imageFilterNone
    };
    if (this.mode === this.keys.create) {
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
    } else {
        this.pagesService.updatePage(this.results.id, results).subscribe(
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
}
