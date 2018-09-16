import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DaoService } from '../../../organization/services/dao.service';
import * as getMember from '../actions/member.action';

@Injectable()
export class MemberEffect {

    @Effect()
    public getRepoData$: Observable<Action> = this.action$
    .ofType(getMember.GET_MEMBER).pipe(
        switchMap( () => this.daoService.getMembers()),
        map( results => new getMember.GetMemberSuccess(results))
    );

    public constructor(
        private action$: Actions,
        private daoService: DaoService
    ) {}
}