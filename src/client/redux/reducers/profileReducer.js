import {
    LOAD_PROFILE,
    LOAD_PROFILE_SUCCESS,
    CLEAR_PROFILE,
    GET_FOLLOWERS,
    GET_FOLLOWING,
    GET_CONNECTION,
} from '../actions/types';

export const initialState = {
    user: null,
    loading: false,
    following: null,
    followers: null,
    connection: null
};

  
export const profileReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_PROFILE:
            return { ...state,
                loading: true
            };
        case LOAD_PROFILE_SUCCESS:
            return { ...state,
                user: action.payload,
                loading: false
            };
        case GET_FOLLOWING:
            return { ...state,
                following: action.payload,
            };
        case GET_FOLLOWERS:
            return { ...state,
                followers: action.payload,
            };
        case GET_CONNECTION:
            return { ...state,
                connection: action.payload,
            };
        case CLEAR_PROFILE:
            return initialState;
        default:
            return state;
    }
}
