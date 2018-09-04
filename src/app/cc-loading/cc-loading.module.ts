import { CcLoadingComponent } from './cc-loading.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CcLoadingComponent],
  exports: [CcLoadingComponent]
})
export class CcLoadingModule { }
