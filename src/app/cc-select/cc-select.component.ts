import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cc-select',
  templateUrl: './cc-select.component.html',
  styleUrls: ['./cc-select.component.scss']
})

export class CcSelectComponent implements OnInit {
  @Output() onSelectedItems: EventEmitter<Array<string>> = new EventEmitter();
  @Input('items') items: Array<string>;
  @Input('selectedItems') selectedItems: Array<string>;
  @Input('label') label: string;

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
    this.onSelectedItems.emit(this.selectedItems);
  }

  removeSelectedItem(item: string): void {
    const found = this.selectedItems.indexOf(item);
    if (found !== -1) {
        this.selectedItems.splice(found, 1);
      }
      this.onSelectedItems.emit(this.selectedItems);
    }
}
