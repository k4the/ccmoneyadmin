import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class UserLoadingComponent implements OnInit {

  constructor() { }

  @Input('isLoading') isLoading: boolean;

  ngOnInit() {
  }

}
