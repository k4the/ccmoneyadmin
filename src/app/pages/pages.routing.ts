import { Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../auth/auth.guard';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    data: { name: 'pages' },
    children: [
      {
        path: 'results',
        component: ResultsComponent,
        canActivate: [AuthGuard],
        data: { name: 'results' }
      },
      {
        path: '',
        redirectTo: 'results',
        pathMatch: 'full',
        data: { name: 'results' }
      },
      {
        path: 'thankyou',
        component: ThankyouComponent,
        canActivate: [AuthGuard],
        data: { name: 'thankyou' }
      }
    ]
  }
];
