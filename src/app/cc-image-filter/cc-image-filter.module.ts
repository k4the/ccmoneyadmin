import { CcImageFilterComponent } from './cc-image-filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ CcImageFilterComponent],
  exports: [
    CcImageFilterComponent
  ]
})
export class CcImageFilterModule { }
