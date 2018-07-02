import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'coins',
    pathMatch: 'full'
  },
  {
    path: 'coins',
    loadChildren: './organization/organization.module#OrganizationModule'
  },
  {
    path: 'logs',
    loadChildren: './stats/stats.module#StatsModule'
  },
  {
    path: '**',
    redirectTo: 'coins'
  }
];
