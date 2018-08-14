import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { routes } from './routes';
import { RepositoriesComponent } from './repositories.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RepositoriesComponent
  ]
})
export class RepositoriesModule { }
