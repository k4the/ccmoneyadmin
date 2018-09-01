import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { UserMapper } from './user.mapper';
import { UserListComponent } from './user-list/user-list.component';
import { UsersModalComponent } from './users-modal/users-modal.component';
import { UserLoadingComponent } from './user-loading/loading.component';
import { AuthMapper } from './auth.mapper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    UserListComponent,
    UsersModalComponent,
    UserLoadingComponent
  ],
  providers: [UserMapper, AuthMapper]
})
export class AuthModule { }
