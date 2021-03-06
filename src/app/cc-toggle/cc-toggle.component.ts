import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cc-toggle',
  templateUrl: './cc-toggle.component.html',
  styleUrls: ['./cc-toggle.component.scss']
})
export class CcToggleComponent implements OnInit {
  @Output() toggleItem = new EventEmitter<any>();
  @Input('label') label: string;
  @Input('item') item: any;

  displayToggle:any = null;

  constructor() { }

  ngOnInit() {
    this.displayToggle = {
      isOn: this.item,
      label: this.label
    };
  }

  setToggle(): void {
    this.displayToggle.isOn = !this.displayToggle.isOn;
    this.toggleItem.emit(this.displayToggle);
  }
}
