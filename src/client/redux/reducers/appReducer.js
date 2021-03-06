import { assign } from "lodash";
import update from "immutability-helper";

import {
	FETCH_AUTH,
	AUTH_CLEAR,
	SHOW_APP_MENU,
	HIDE_APP_MENU,
	TOGGLE_THEME,
	SHOW_USERNAME,
	HIDE_USERNAME,
	SHOW_DRAWER,
	HIDE_DRAWER,
	UPDATE_TOTAL_PIXELS,
	UPDATE_TOTAL_SCROLLED_PIXELS,
    SUGGESTIONS_UPDATE,
    SUGGESTIONS_CLEAR,
    UPDATE_COLLECTION,
	SHOW_SEARCH,
	HIDE_SEARCH,
	SEARCH_RESULTS,
	SEARCH_RESULTS_SUCCESS,
	CLEAR_SEARCH_RESULTS,
	PRELOAD_TICKER,
	PRELOAD_VIDEO
} from "../actions/types";

export const initialState = {
	totalPixels: 0,
	clientWidth: 0,
	clientHeight: 0,
	totalScrolledPixels: 0,
	scrollTo: null,
	user: null,
	theme: "light",
	menuOpen: false,
	usernameOpen: false,
	drawerOpen: false,
    drawerType: null,
    drawerData: {},
    suggestions: [],
    updateCollection: false,
	searchOpen: false,
	search: {
		loading: false,
		results: []
	},
	preloadTicker: {},
	preloadVideo: {}
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_AUTH:
			return {
				...state,
				user: action.payload
			}
		case AUTH_CLEAR:
			return {
				...state,
				user: null
			}
		case SHOW_APP_MENU:
			return {
				...state,
				menuOpen: true
			}
		case HIDE_APP_MENU:
			return {
				...state,
				menuOpen: false
			}
		case TOGGLE_THEME:
			return {
				...state,
				theme: action.payload
			}
		case SHOW_USERNAME:
			return {
				...state,
				usernameOpen: true
			}
		case HIDE_USERNAME:
			return {
				...state,
				usernameOpen: false
			}
		case SHOW_DRAWER:
            let drawer

            if(action.drawerData) {
                drawer = action.drawerData
            } else {
                drawer = state.drawerData
            }
			return {
				...state,
				drawerOpen: true,
                drawerType: action.payload,
                drawerData: drawer
			}
		case HIDE_DRAWER:
			return {
				...state,
				drawerOpen: false,
                drawerType: null,
                drawerData: null,
                suggestions: []
			}
		case UPDATE_TOTAL_PIXELS:
			return {
				...state,
				totalPixels: action.total,
				clientWidth: action.clientWidth,
				clientHeight: action.clientHeight
			} ;
		case UPDATE_TOTAL_SCROLLED_PIXELS:
			return {
				...state,
				totalScrolledPixels: action.pixels
			};
		case SUGGESTIONS_UPDATE:
			return {
				...state,
				suggestions: action.payload
            };
        case SUGGESTIONS_CLEAR:
            return {
                ...state,
                suggestions: []
            };
        case UPDATE_COLLECTION:
            return {
                ...state,
                updateCollection: action.payload
            };
		case SHOW_SEARCH:
			return {
				...state,
				searchOpen: true
			}
		case HIDE_SEARCH:
			return {
				...state,
				searchOpen: false
			}
		case SEARCH_RESULTS:
			return {
				...state,
				search: {
					...state.search,
					loading: true
				}
			}
		case SEARCH_RESULTS_SUCCESS:
			return {
				...state,
				search: {
					...state.search,
					loading: false,
					results: action.payload
				}
			}
		case CLEAR_SEARCH_RESULTS:
			return {
				...state,
				search: {
					...state.search,
					loading: false,
					results: []
				}
			}
		case PRELOAD_TICKER:
			return {
				...state,
				preloadTIcker: action.payload
			}
		case PRELOAD_VIDEO:
			return {
				...state,
				preloadVideo: action.payload
			}
		default:
			return state;
	}
};

