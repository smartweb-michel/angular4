import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DaoService } from '../../../organization/services/dao.service';
import * as getOrganization  from '../actions/getOrganization.action';

@Injectable()
export class OrganisationEffect {

    @Effect()
    public getOrgasisationData$: Observable<Action> = this.action$
    .ofType(getOrganization.GET_ORGANISATION).pipe(
        switchMap( () => this.daoService.getOrganization()),
        map( results => new getOrganization.GetGetOrganisationSuccess(results))
    );
    @Effect()
    public changePage$: Observable<Action> = this.action$
    .ofType(getOrganization.GO_TO_NEXT_PAGE).pipe(
        switchMap( () => this.daoService.getOrganization()),
        map( results => new getOrganization.GetGetOrganisationSuccess(results))
    );

    public constructor(
        private action$: Actions,
        private daoService: DaoService
    ) {}
}