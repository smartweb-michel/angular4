import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MomentModule } from 'angular2-moment';
import { ReactiveFormsModule } from '@angular/forms';

import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { OnlineComponent } from './online/online.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'prefix'
  },
  {
    path: 'all',
    loadChildren: './list/list.module#ListModule'
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'edit/:label',
    component: EditComponent
  },
  {
    path: 'view/:label',
    component: ViewComponent
  },
  {
    path: 'online',
    component: OnlineComponent
  },
  {
    path: 'repositories',
    loadChildren: './repositories/repositories.module#RepositoriesModule'
  },
  {
    path: 'members',
    loadChildren: './members/members.module#MembersModule'
  }
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MomentModule,
    ReactiveFormsModule
  ],
  declarations: [
    ViewComponent,
    CreateComponent,
    EditComponent, OnlineComponent
  ]
})
export class OrganizationModule { }
