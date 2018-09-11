import { Action } from '@ngrx/store';

export const GET_ORGANISATION = '[Organisation] Get Organisation';
export const GET_ORGANISATION_SUCCESS = '[Organisation] Get Organisation Success';

export const GO_TO_NEXT_PAGE = '[Paginator] Go To Next Page';
export const FIELD_FILTER = '[Filter] Field Filter';

export class GetOrganisation implements Action {
    public readonly type = GET_ORGANISATION;
}
export class GetGetOrganisationSuccess implements Action {
    public readonly type = GET_ORGANISATION_SUCCESS;
    public constructor( public payload: any ) {}
}

export class ChangePage implements Action {
  public readonly type = GO_TO_NEXT_PAGE;
  public constructor( public payload: any ) {}
}
export class FieldFilter implements Action {
  public readonly type = FIELD_FILTER;
  public constructor( public payload: any ) {}
}

export type AllMarketData =
                        GetOrganisation |
                        GetGetOrganisationSuccess |
                        ChangePage |
                        FieldFilter;