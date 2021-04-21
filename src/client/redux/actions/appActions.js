import {
	SHOW_APP_MENU,
	HIDE_APP_MENU,
	TOGGLE_THEME,
	SHOW_USERNAME,
	HIDE_USERNAME
} from "./types";

import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

import { fetchCurrentUser } from "./authActions"


/////////////////////////////////////////////////

export const validateUsername = values => {
	return axios
		.post("/api/validate_username", {
			username: values.username
		})
		.then(response => {
			if (response.status === 200) {
			}
		})
		.catch(error => {
			throw { username: "Already Exists" };
		});
};

/////////////////////////////////////////////////

export const updateUsername = (username, success) => async (
    dispatch,
	getState,
	api
) => {

    api
        .post("/update_username", {
			username: username
		})
		.then(response => {
				dispatch(fetchCurrentUser())
				dispatch(hideUsername())
			if (success) {
				success(response.data);
				
            }
		})
		.catch(() => {
			console.log("error")
        });
}

/////////////////////////////////////////////////

export const showUsername = (success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: SHOW_USERNAME,
    });

	if (success) {
		success();
	}
	document.body.classList.add("no-scroll");
};

export const hideUsername = (success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: HIDE_USERNAME ,
    });

	if (success) {
		success();
	}
	document.body.classList.remove("no-scroll");
};



/////////////////////////////////////////////////

export const assignAvatar = ({success }) => async (
    dispatch,
	getState,
	api
) => {

    api
        .post("/assign_avatar", {})
		.then(response => {
			setTimeout(() => {
				dispatch(fetchCurrentUser())
			}, 100)
			if (success) {
				success(response.data);
				
            }
		})
		.catch(() => {
			console.log("error")
        });
}

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
