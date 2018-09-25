import { ActionReducerMap } from '@ngrx/store';

import * as GetDatas from './getRequests.reducer';
import * as GetMarket from './getMarketData.reducer';
import * as GetOrganization from './getOrganization.reducer';
import * as GetRepository from './repository.reducer';
import * as GerMember from './member.reduce';


export interface IState {
    CoinsData: GetDatas.IState;
    GetMarket: GetMarket.IState;
    GetOrganization: GetOrganization.IState;
    GetRepository: GetRepository.IState;
    GerMember: GerMember.IState;
}

export const reducers: ActionReducerMap<IState> = {
    CoinsData: GetDatas.reducer,
    GetMarket: GetMarket.reducer,
    GetOrganization: GetOrganization.reducer,
    GetRepository: GetRepository.reducer,
    GerMember: GerMember.reducer
};
