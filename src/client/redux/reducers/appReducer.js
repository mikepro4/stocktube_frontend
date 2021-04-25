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
	SCROLL_TO,
	SCROLL_TO_RESET,
	UPDATE_DRAWER,
    RESET_DRAWER,
    SUGGESTIONS_UPDATE,
    SUGGESTIONS_CLEAR,
    UPDATE_COLLECTION,
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
    updateCollection: false
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
		default:
			return state;
	}
};

