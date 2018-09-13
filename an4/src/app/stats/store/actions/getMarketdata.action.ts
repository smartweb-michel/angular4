import { Action } from '@ngrx/store';

export const GET_MARKET_DATA = '[Market] Get Market Data';
export const GET_MARKET_DATA_SUCCESS = '[Market] Get Market Data Success';

export class GetData implements Action {
    public readonly type = GET_MARKET_DATA;
}
export class GetDataSuccess implements Action {
    public readonly type = GET_MARKET_DATA_SUCCESS;
    public constructor( public payload: any ) {}
}

export type AllMarketData =
                        GetData |
                        GetDataSuccess;