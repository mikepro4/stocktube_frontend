import {
    LOAD_VIDEO,
    LOAD_VIDEO_SUCCESS,
    CLEAR_VIDEO,
} from '../actions/types';

export const initialState = {
    loading: false,
    video: null,
};

  
export const videoReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_VIDEO:
            return { ...state,
                loading: true
            };
        case LOAD_VIDEO_SUCCESS:
            return { ...state,
                video: action.payload,
                loading: false
            };
        case CLEAR_VIDEO:
            return initialState;
        default:
            return state;
    }
}
