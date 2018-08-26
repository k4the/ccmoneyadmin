import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcSelectComponent } from './cc-select.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CcSelectComponent
  ],
  entryComponents: [CcSelectComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CcSelectModule { }
