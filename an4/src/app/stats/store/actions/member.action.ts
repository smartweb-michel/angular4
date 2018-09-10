import { Action } from '@ngrx/store';

export const GET_MEMBER = '[Member] Get Member';
export const GET_MEMBER_SUCCESS = '[Member] Get Member Success';

export class GetMember implements Action {
    public readonly type = GET_MEMBER;
}
export class GetMemberSuccess implements Action {
    public readonly type = GET_MEMBER_SUCCESS;
    public constructor( public payload: any ) {}
}

export type AllMarketData =
                            GetMember |
                            GetMemberSuccess;