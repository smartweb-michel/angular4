import { Action } from '@ngrx/store';

export const GET_COINS_DATA = '[Coins] Get Coins Data';
export const GET_COINS_DATA_SUCCESS = '[Coins] Get Coins Data Success';

export const GET_COINS_ONLINE_DATA = '[Coins] Get Online Coins Data';
export const GET_COINS_ONLINE_DATA_SUCCESS = '[Coins] Get Coins Online Data Success';

export const GET_COINS_OFFLINE_DATA = '[Coins] Get Offline Coins Data';
export const GET_COINS_OFFLINE_DATA_SUCCESS = '[Coins] Get Offline Coins Data Success';

export const CHANGE_PAGE = '[Paginator] Change Page';

export const FIELDS_FILTER = '[FILTER] Fields Filter';

export class GetCoinsData implements Action {
    public readonly type = GET_COINS_DATA;
}
export class GetCoinsDataSuccess implements Action {
    public readonly type = GET_COINS_DATA_SUCCESS;
    public constructor( public payload: any ) {}
}
export class ChangePage implements Action {
    public readonly type = CHANGE_PAGE;
    public constructor( public payload: any ) {}
}
export class FieldsFilter implements Action {
    public readonly type = FIELDS_FILTER;
    public constructor( public payload: any ) {}
}

export class GetCoinsOfflineData implements Action {
    public readonly type = GET_COINS_OFFLINE_DATA;
}
export class GetCoinsOfflineDataSuccess implements Action {
    public readonly type = GET_COINS_OFFLINE_DATA_SUCCESS;
    public constructor( public payload: any ) {}
}

export class GetCoinsOnlineData implements Action {
    public readonly type = GET_COINS_ONLINE_DATA;
}
export class GetCoinsOnlineDataSuccess implements Action {
    public readonly type = GET_COINS_ONLINE_DATA_SUCCESS;
    public constructor( public payload: any ) {}
}

export type AllProducts =
                        GetCoinsData|
                        GetCoinsDataSuccess |
                        GetCoinsOnlineData |
                        GetCoinsOnlineDataSuccess |
                        GetCoinsOfflineData |
                        GetCoinsOfflineDataSuccess |
                        ChangePage |
                        FieldsFilter;
