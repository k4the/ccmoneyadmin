import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.css']
})
export class ProductSelectComponent implements OnInit {
  @Output()
  productSelectedItems = new EventEmitter<Array<string>>();
  @Input('items')
  items: Array<string>;
  @Input('selectedItems')
  selectedItems: Array<string>;
  @Input('label')
  label: string;

  selectOpen = false;

  constructor() {}

  ngOnInit() {}

  openSelect(): void {
    this.selectOpen = !this.selectOpen;
  }

  addSelectedItem(item: string): void {
    const found = this.selectedItems.indexOf(item);
    if (found === -1) {
      this.selectedItems.push(item);
    }
    this.selectOpen = false;
    this.productSelectedItems.next(this.selectedItems);
  }

  removeSelectedItem(item: string): void {
    const found = this.selectedItems.indexOf(item);
    if (found !== -1) {
        this.selectedItems.splice(found, 1);
      }
      this.productSelectedItems.next(this.selectedItems);
    }
}
