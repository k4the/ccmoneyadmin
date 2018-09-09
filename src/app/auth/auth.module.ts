import { CcLoadingModule } from './../cc-loading/cc-loading.module';
import { CcModalModule } from './../cc-modal/cc-modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { UserMapper } from './user.mapper';
import { UserListComponent } from './user-list/user-list.component';
import { AuthMapper } from './auth.mapper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    CcModalModule,
    CcLoadingModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    UserListComponent
  ],
  providers: [UserMapper, AuthMapper]
})
export class AuthModule { }
