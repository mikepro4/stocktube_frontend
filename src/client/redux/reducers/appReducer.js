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
	drawerOpen: false
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
			return {
				...state,
				drawerOpen: true
			}
		case HIDE_DRAWER:
			return {
				...state,
				drawerOpen: false
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
		case SCROLL_TO:
			return {
				...state,
				scrollTo: action.payload
			};
		case SCROLL_TO_RESET:
			return {
				...state,
				scrollTo: null
			};
		default:
			return state;
	}
};

