import * as GetDataActions from '../actions/getRequests.action';


export interface IState {
    isLoading: boolean;
    isLoaded: boolean;
    pageIndex: any;
    pageSize: any;
    coins: any;
    onlineCoins: any;
    coinslength: number;
    offlineCoins: any;
    onlineCoinslength: number;
    filter: any;
}

const initialState: IState = {
    isLoading: false,
    isLoaded: false,
    pageIndex: 0,
    pageSize: 50,
    coins: [],
    onlineCoins: [],
    coinslength: 0,
    offlineCoins: [],
    onlineCoinslength: 0,
    filter: {
        active: '',
        direction: 'asc'
    }
};

export function reducer ( state = initialState, action: GetDataActions.AllProducts): IState {
    switch (action.type) {
        case GetDataActions.GET_COINS_DATA: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case GetDataActions.FIELDS_FILTER: {
            return {
                ...state,
                filter: { active: action.payload.active, direction: action.payload.direction}
            };
        }
        case GetDataActions.GET_COINS_ONLINE_DATA: {
            return {
                ...state,
                isLoading: true
            };
        }
        case GetDataActions.GET_COINS_OFFLINE_DATA: {
            return {
                ...state,
                isLoading: true
            };
        }
        case GetDataActions.GET_COINS_ONLINE_DATA_SUCCESS: {
            return {
                ...state,
                onlineCoins: action.payload,
                onlineCoinslength: action.payload.length
            };
        }
        case GetDataActions.GET_COINS_OFFLINE_DATA_SUCCESS: {
            return {
                ...state,
                offlineCoins: action.payload,
            };
        }
        case GetDataActions.GET_COINS_DATA_SUCCESS: {
            const _pageSize = state.pageSize;
            const _pageIndex = state.pageIndex;
            const payload = action.payload.slice(_pageIndex * _pageSize, (_pageIndex + 1) * _pageSize);
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                coins: payload,
                coinslength: action.payload.length
            };
        }
        case GetDataActions.CHANGE_PAGE: {
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
        default: {
            return state;
        }
    }
}
