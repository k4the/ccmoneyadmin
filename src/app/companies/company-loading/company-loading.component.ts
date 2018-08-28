import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-loading',
  templateUrl: './company-loading.component.html',
  styleUrls: ['./company-loading.component.scss']
})
export class CompanyLoadingComponent implements OnInit {

  constructor() { }

  @Input('isLoading') isLoading: boolean;

  ngOnInit() {
  }

}
