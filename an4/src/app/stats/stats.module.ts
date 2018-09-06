import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { RequestsHistoryComponent } from './requests-history/requests-history.component';
import { RequestsPendingComponent } from './requests-pending/requests-pending.component';
import { RequestComponent } from './request/request.component';
import { SharedModule } from '../shared/shared.module';
import { MomentModule } from 'angular2-moment';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'requests',
    pathMatch: 'prefix'
  },
  {
    path: 'requests',
    component: RequestsListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MomentModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [RequestsListComponent, RequestsHistoryComponent, RequestsPendingComponent, RequestComponent]
})
export class StatsModule { }
