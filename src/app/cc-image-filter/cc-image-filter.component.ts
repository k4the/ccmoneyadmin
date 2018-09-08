import { ImageFilter } from './../pages/image-filter.model';
import { Component, OnInit, Input } from '@angular/core';
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
  keys = Keys;

  constructor() {}

  ngOnInit() {

  }
}
