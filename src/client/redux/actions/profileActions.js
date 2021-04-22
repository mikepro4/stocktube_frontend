import {
    LOAD_PROFILE,
    LOAD_PROFILE_SUCCESS,
    CLEAR_PROFILE
} from '../actions/types';

import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

export const loadProfile = (username, success) => async (
    dispatch,
	getState,
	api
) => {


    dispatch({
        type: LOAD_PROFILE
    });

    await api
        .post("/profile", { username })
        .then(response => {
            dispatch({
                type: LOAD_PROFILE_SUCCESS,
                payload: response.data
            });
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}

export const clearProfile = (username, success) => async (
    dispatch,
	getState,
	api
) => {


    dispatch({
        type: CLEAR_PROFILE
    });
}
