import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DaoService } from '../../../organization/services/dao.service';
import * as getData  from '../actions/getRequests.action';
import * as getMarketData  from '../actions/getMarketdata.action';

@Injectable()
export class GetProductsEffect {

    @Effect()
    public getMarketData$: Observable<Action> = this.action$.ofType(getMarketData.GET_MARKET_DATA).pipe(
        switchMap( () => this.daoService.getMarketData()),
        map( results => new getMarketData.GetDataSuccess(results[0]))
    );

    @Effect()
    public getCoinsData$: Observable<Action> = this.action$.ofType(getData.GET_COINS_DATA).pipe(
        switchMap( () => this.daoService.getCoins()),
        map( results => new getData.GetCoinsDataSuccess(results))
    );

    @Effect()
    public getCoinsOnlineData$: Observable<Action> = this.action$.ofType(getData.GET_COINS_ONLINE_DATA).pipe(
        switchMap( () => this.daoService.getOnlineCoins()),
        map( results => new getData.GetCoinsOnlineDataSuccess(results))
    );
    @Effect()
    public getCoinsOfflineData$: Observable<Action> = this.action$.ofType(getData.GET_COINS_OFFLINE_DATA).pipe(
        switchMap( () => this.daoService.getOfflineCoins()),
        map( results => new getData.GetCoinsOfflineDataSuccess(results))
    );
    @Effect()
    public changePage$: Observable<Action> = this.action$.ofType(getData.CHANGE_PAGE).pipe(
        map( page => page),
        switchMap( () => this.daoService.getCoins()),
        map( results => new getData.GetCoinsDataSuccess(results))
    );


    public constructor(
        private action$: Actions,
        private daoService: DaoService
    ) {}
}