import { PagesHeaderComponent } from './pages-header/pages-header.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ResultsComponent } from './results/results.component';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routing';
import { CcLoadingModule } from '../cc-loading/cc-loading.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    CcLoadingModule,
    FormsModule
  ],
  declarations: [
    PagesComponent,
    ResultsComponent,
    ThankyouComponent,
    PagesHeaderComponent
  ],
  exports: [
    RouterModule
  ]
})
export class PagesModule { }
