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
	HIDE_DRAWER
} from "../actions/types";

export const initialState = {
	user: null,
	theme: "light",
	menuOpen: false,
	usernameOpen: false,
	drawerOpen: true
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
		default:
			return state;
	}
};

