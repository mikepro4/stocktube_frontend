import {
    LOAD_TICKER,
    LOAD_TICKER_SUCCESS,
    CLEAR_TICKER,
    GET_FOLLOWERS_OF_TICKER,
    GET_CONNECTION_TO_TICKER,
    GET_FEATURED_FOLLOWERS,
    SET_ACTIVE_FEATURED_VIDEO
} from '../actions/types';

export const initialState = {
    ticker: null,
    loading: false,
    followers: null,
    connection: null,
    featuredFollowers: null,
    activeFeaturedVideo: null
};

  
export const tickerReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_TICKER:
            return { ...state,
                loading: true
            };
        case LOAD_TICKER_SUCCESS:
            return { ...state,
                ticker: action.payload,
                loading: false
            };
        case GET_FOLLOWERS_OF_TICKER:
            return { ...state,
                followers: action.payload,
                featuredFollowers: action.featuredFollowers
            };
        case GET_CONNECTION_TO_TICKER:
            return { ...state,
                connection: action.payload,
            };
        case SET_ACTIVE_FEATURED_VIDEO:
            return { ...state,
                activeFeaturedVideo: action.payload,
            };
        case CLEAR_TICKER:
            return initialState;
        default:
            return state;
    }
}
