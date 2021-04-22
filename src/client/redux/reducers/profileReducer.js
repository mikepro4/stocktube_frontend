import {
    LOAD_PROFILE,
    LOAD_PROFILE_SUCCESS,
    CLEAR_PROFILE
} from '../actions/types';

export const initialState = {
    user: null,
    loading: false
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
        case CLEAR_PROFILE:
            return { ...state,
                user: null,
                loading: false
            };
        default:
            return state;
    }
}
