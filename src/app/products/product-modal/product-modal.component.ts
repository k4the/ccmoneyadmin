import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Keys } from '../../global.constants';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {
  @Output()
  productModalResult = new EventEmitter<{result: boolean, id: string}>();
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
    this.productModalResult.next({result: true, id: this.id});
  }

  cancel(): void {
    this.productModalResult.next({result: false, id: this.id});
  }
}
