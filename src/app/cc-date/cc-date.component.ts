import { Days, Months, Years, DateLabels } from './cc-date.data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cc-date',
  templateUrl: './cc-date.component.html',
  styleUrls: ['./cc-date.component.scss']
})
export class CcDateComponent implements OnInit {
  days: Array<number> = Days;
  months: Array<any> = Months;
  years: Array<number> = Years;
  labels = DateLabels;

  constructor() {}

  ngOnInit() {
  }

}
