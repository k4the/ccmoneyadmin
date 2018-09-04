import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcSingleSelectComponent } from './cc-single-select.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CcSingleSelectComponent
  ],
  exports: [
    CcSingleSelectComponent
  ]
})
export class CcSingleSelectModule { }
