// import { CcLoadingModule } from './cc-loading/cc-loading.module';
// import { CcSingleSelectModule } from './cc-single-select/cc-single-select.module';
// import { CcSelectModule } from './cc-select/cc-select.module';
// import { CcModalModule } from './cc-modal/cc-modal.module';
// import { CcToggleModule } from './cc-toggle/cc-toggle.module';
// import { CcImageFilterModule } from './cc-image-filter/cc-image-filter.module';
import { UserMapper } from './auth/user.mapper';
import { CompanyMapper } from './companies/company.mapper';
import { ProductMapper } from './products/product.mapper';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { AuthGuard } from './auth/auth.guard';
import { PageMapper } from './pages/page.mapper';

import { CustomerMapper } from './customers/customer.mapper';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    // CcModalModule,
    // CcSelectModule,
    // CcSingleSelectModule,
    // CcToggleModule,
    // CcLoadingModule,
    // CcImageFilterModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    CompanyMapper,
    ProductMapper,
    UserMapper,
    PageMapper,
    CustomerMapper
],
  bootstrap: [AppComponent]
})
export class AppModule { }
