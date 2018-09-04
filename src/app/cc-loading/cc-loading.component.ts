import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cc-loading',
  templateUrl: './cc-loading.component.html',
  styleUrls: ['./cc-loading.component.scss']
})
export class CcLoadingComponent implements OnInit {

  constructor() { }

  @Input('isLoading') isLoading: boolean;

  ngOnInit() {
  }

}
