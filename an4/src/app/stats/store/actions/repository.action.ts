import { Action } from '@ngrx/store';

export const GET_REPOSITORY = '[Repository] Get Repository';
export const GET_REPOSITORY_SUCCESS = '[Repository] Get Repository Success';

export const CHANGE_PAGE = '[Paginator] Change Page';
export const FIELD_FILTER = '[Filter] Field Filter';

export class ChangePage implements Action {
  public readonly type = CHANGE_PAGE;
  public constructor( public payload: any ) {}
}
export class FieldFilter implements Action {
  public readonly type = FIELD_FILTER;
  public constructor( public payload: any ) {}
}

export class GetRepository implements Action {
    public readonly type = GET_REPOSITORY;
}
export class GetRepositorySuccess implements Action {
    public readonly type = GET_REPOSITORY_SUCCESS;
    public constructor( public payload: any ) {}
}

export type AllMarketData =
                            GetRepository |
                            GetRepositorySuccess |
                            ChangePage |
                            FieldFilter;

