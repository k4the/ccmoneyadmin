import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { PagesRoutes } from '../pages.routing';
import { slideDown } from '../../animations/slide-down.animation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages-header',
  templateUrl: './pages-header.component.html',
  styleUrls: ['./pages-header.component.scss'],
  animations: [slideDown]
})
export class PagesHeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  pagesRoutes: Array<any> = PagesRoutes[0].children;
  minBrowserWidth = 760;
  slideDownState = 'closed';
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

  gotoPage(path: string): void {
    this.slideDownState = 'closed';
    if(path === '/') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/pages/' + path]);
    }
  }

  togglePagesMenu(event?: any): void {
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
