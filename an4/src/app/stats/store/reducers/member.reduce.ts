import * as GetMemberActions from '../actions/member.action';


export interface IState {
    isLoading: boolean;
    isLoaded: boolean;
    member: any;
}

const initialState: IState = {
    isLoading: false,
    isLoaded: false,
    member: [],
};

export function reducer ( state = initialState, action: GetMemberActions.AllMarketData): IState {
    switch (action.type) {
        case GetMemberActions.GET_MEMBER: {
           return {
               ...state,
               isLoading: true
           };
        }
        case GetMemberActions.GET_MEMBER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                member: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}
