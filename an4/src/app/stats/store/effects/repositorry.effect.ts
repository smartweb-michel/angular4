import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DaoService } from '../../../organization/services/dao.service';
import * as getRepository  from '../actions/repository.action';

@Injectable()
export class RepoEffect {

    @Effect()
    public getRepoData$: Observable<Action> = this.action$
    .ofType(getRepository.GET_REPOSITORY).pipe(
        switchMap( () => this.daoService.getRepositories()),
        map( results => new getRepository.GetRepositorySuccess(results))
    );

    @Effect()
    public changePage$: Observable<Action> = this.action$
    .ofType(getRepository.CHANGE_PAGE).pipe(
        switchMap( () => this.daoService.getRepositories()),
        map( results => new getRepository.GetRepositorySuccess(results))
    );

    public constructor(
        private action$: Actions,
        private daoService: DaoService
    ) {}
}
