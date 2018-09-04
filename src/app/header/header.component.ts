import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { AppRoutes } from '../app.routing';
import { slideDown } from '../animations/slide-down.animation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideDown]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  appRoutes: any[] = AppRoutes;
  minBrowserWidth = 760;
  slideDownState = 'open';
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      });
  }

  goto(path: string): void {
    this.slideDownState = 'closed';
    this.router.navigate([path]);
  }

  toggleMenu(event?: any): void {
    if (window.innerWidth < this.minBrowserWidth) {
      this.slideDownState === 'closed'
        ? (this.slideDownState = 'open')
        : (this.slideDownState = 'closed');
    }
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
