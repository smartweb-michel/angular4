import * as GetOrganisationActions from '../actions/getOrganization.action';


export interface IState {
    isLoading: boolean;
    isLoaded: boolean;
    pageIndex: any;
    pageSize: any;
    organization: any;
    organizationLength: number;
    filter: any;
}

const initialState: IState = {
    isLoading: false,
    isLoaded: false,
    pageIndex: 0,
    pageSize: 50,
    organization: [],
    organizationLength: 0,
    filter: {
        active: '',
        direction: 'asc'
    }
};

export function reducer ( state = initialState, action: GetOrganisationActions.AllMarketData): IState {
    switch (action.type) {
        case GetOrganisationActions.GET_ORGANISATION: {
           return {
               ...state,
               isLoading: true
           };
        }
        case GetOrganisationActions.GET_ORGANISATION_SUCCESS: {
            const pageSize = state.pageSize;
            const pageIndex = state.pageIndex;
            const payload = action.payload.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                organization: payload,
                organizationLength: action.payload.length
            };
        }
        case GetOrganisationActions.GO_TO_NEXT_PAGE: {
            const _pageSize = action.payload.pageSize;
            const _pageIndex = action.payload.pageIndex;
            return {
                ...state,
                isLoading: true,
                isLoaded: false,
                pageIndex: _pageIndex,
                pageSize: _pageSize,
            };
        }
        case GetOrganisationActions.FIELD_FILTER: {
            return {
                ...state,
                filter: { active: action.payload.active, direction: action.payload.direction },
                isLoading: true
            };
        }
        default: {
            return state;
        }
    }
}
