import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Auth } from '../auth.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  loginError = false;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const auth: Auth = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.login(auth).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      err => {
        this.loginError = true;
        this.isLoading = false;
      }
    );
  }
}
