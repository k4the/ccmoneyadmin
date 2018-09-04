import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cc-single-select',
  templateUrl: './cc-single-select.component.html',
  styleUrls: ['./cc-single-select.component.css']
})
export class CcSingleSelectComponent implements OnInit {
  @Output() singleSelectedItems = new EventEmitter<any>();
  @Input('items') items: Array<any>;
  @Input('label') label: string;
  @Input('selectedLabel') selectedLabel: string;

  selectOpen = false;

  constructor() { }

  ngOnInit() {
  }

  openSelect(): void {
    this.selectOpen = !this.selectOpen;
  }

  setSelected(selected: any): void {
    this.selectOpen = false;
    this.selectedLabel = selected.name;
    const item = {
      data: selected,
      label: this.label
    };
    this.singleSelectedItems.emit(item);
  }

}
