import * as GetDataActions from '../actions/getMarketdata.action';


export interface IState {
    isLoading: boolean;
    isLoaded: boolean;
    marketData: any;
}

const initialState: IState = {
    isLoading: false,
    isLoaded: false,
    marketData: {},
};

export function reducer ( state = initialState, action: GetDataActions.AllMarketData): IState {
    switch (action.type) {
        case GetDataActions.GET_MARKET_DATA: {
           return {
               ...state,
               isLoading: true
           };
        }
        case GetDataActions.GET_MARKET_DATA_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                marketData: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}
