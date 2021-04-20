import {
	SHOW_APP_MENU,
	HIDE_APP_MENU,
	TOGGLE_THEME
} from "./types";

import moment from "moment";
import * as _ from "lodash";
import qs from "qs";

/////////////////////////////////////////////////

export const updateQueryString = (
	updatedState,
	location,
	history
) => dispatch => {
	let queryParams = qs.parse(location.search.substring(1));
	const updatedQuery = _.assign({}, queryParams, updatedState);
	const str = qs.stringify(updatedQuery);
	history.push({
		search: "?" + str
	});
};

/////////////////////////////////////////////////


export const showMenu = (success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: SHOW_APP_MENU,
    });

	if (success) {
		success();
	}
	document.body.classList.add("no-scroll");
};

export const hideMenu = (success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: HIDE_APP_MENU,
    });

	if (success) {
		success();
	}
	document.body.classList.remove("no-scroll");
};

/////////////////////////////////////////////////

export const toggleTheme = (theme, success) => async (
    dispatch,
	getState,
	api
) => {

	if(theme) {
		dispatch({
			type: TOGGLE_THEME,
			payload: theme
		});
	} else {

		let newTheme
			if(getState().app.theme == "light") {
				newTheme = "dark"
			} else {
				newTheme = "light"
			}

			localStorage.setItem('theme', newTheme);
			document.body.removeAttribute("class")
			document.body.classList.add("theme-" + newTheme);
		dispatch({
			type: TOGGLE_THEME,
			payload: newTheme
		});
	}
    
	if (success) {
		success();
	}
};
