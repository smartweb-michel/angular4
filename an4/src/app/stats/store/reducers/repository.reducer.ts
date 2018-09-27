import * as GeRepositoryActions from '../actions/repository.action';


export interface IState {
    isLoading: boolean;
    isLoaded: boolean;
    repository: any;
    reposLength: number;
    pageIndex: any;
    pageSize: any;
    filter: any;
}

const initialState: IState = {
    isLoading: false,
    isLoaded: false,
    repository: [],
    reposLength: 0,
    pageIndex: 0,
    pageSize: 50,
    filter: {
        active: '',
        direction: 'asc'
    }
};

export function reducer(state = initialState, action: GeRepositoryActions.AllMarketData): IState {
    switch (action.type) {
        case GeRepositoryActions.GET_REPOSITORY: {
            return {
                ...state,
                isLoading: true
            };
        }
        case GeRepositoryActions.GET_REPOSITORY_SUCCESS: {
            const pageSize = state.pageSize;
            const pageIndex = state.pageIndex;
            const payload = action.payload.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                repository: payload,
                reposLength: action.payload.length
            };
        }
        case GeRepositoryActions.CHANGE_PAGE: {
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
        case GeRepositoryActions.FIELD_FILTER: {
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
