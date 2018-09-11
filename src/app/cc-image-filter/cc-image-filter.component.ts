import { ImageFilter } from './../pages/image-filter.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Keys } from '../global.constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cc-image-filter',
  templateUrl: './cc-image-filter.component.html',
  styleUrls: ['./cc-image-filter.component.scss']
})
export class CcImageFilterComponent implements OnInit {
  @Input('imageFilter') imageFilter: ImageFilter;
  @Input('type') type: string;
  @Output() selectImageFilter = new EventEmitter<any>();
  keys = Keys;
  imageFilterSelected = false;
  displayImageFilter: any = null;
  constructor() {}

  ngOnInit() {
    this.imageFilterSelected = this.imageFilter.isActive;
    this.displayImageFilter = {
      isOn: this.imageFilterSelected,
      type: this.type
    };
  }

  setImageFilter(): void {
    this.imageFilterSelected = !this.imageFilterSelected;
    this.selectImageFilter.emit(this.imageFilter);
  }
}
