import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Keys } from '../global.constants';

@Component({
  selector: 'app-cc-modal',
  templateUrl: './cc-modal.component.html',
  styleUrls: ['./cc-modal.component.scss']
})
export class CcModalComponent implements OnInit {
  @Output()
  ccModalResult = new EventEmitter<{result: boolean, id: string}>();
  @Input('name')
  name: string;
  @Input('title')
  title: string;
  @Input('message')
  message: string;
  @Input('type')
  type: string;
  @Input('id')
  id: string;

  modalOpen = false;
  keys = Keys;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.modalOpen = true;
    }, 0);
  }
  ok(): void {
    this.ccModalResult.next({result: true, id: this.id});
  }

  cancel(): void {
    this.ccModalResult.next({result: false, id: this.id});
  }
}
