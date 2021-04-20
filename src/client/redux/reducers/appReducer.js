import { assign } from "lodash";
import update from "immutability-helper";

import {
	FETCH_AUTH,
	AUTH_CLEAR,
	SHOW_APP_MENU,
	HIDE_APP_MENU,
	TOGGLE_THEME
} from "../actions/types";

export const initialState = {
	user: null,
	menuOpen: false,
	theme: "light"
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
		default:
			return state;
	}
};

