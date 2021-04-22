import {
    LOAD_PROFILE,
    LOAD_PROFILE_SUCCESS,
    CLEAR_PROFILE,
    GET_FOLLOWERS,
    GET_FOLLOWING,
    GET_CONNECTION
} from '../actions/types';

import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

import { fetchCurrentUser } from "./authActions"

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
            // dispatch(getConnection(getState().user._id, response.data._id))
            dispatch({
                type: LOAD_PROFILE_SUCCESS,
                payload: response.data
            });
            // let id1 = getState().user._id;
            // let id2 = response.data._id;
            // console.log(id2)
            // dispatch(getConnection(getState().user._id, response.data._id))
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

// ===========================================================================


export const getFollowers = (objectId, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/connection/get_followers", { objectId })
        .then(response => {
            dispatch({
                type: GET_FOLLOWERS,
                payload: response.data
            });
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const getFollowing = (objectId, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/connection/get_following", { objectId })
        .then(response => {
            dispatch({
                type: GET_FOLLOWING,
                payload: response.data
            });
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const createConnection = (object, subject, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/connection/create", { object, subject })
        .then(response => {
            // dispatch(getConnection(object._id, subject._id))
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const getConnection = (objectId, subjectId, success) => async (
    dispatch,
	getState,
	api
) => {
    if(objectId == subjectId) {
        dispatch({
            type: GET_CONNECTION,
            payload: "self"
        }); 
    } else {
        await api
            .post("/connection/search", { objectId, subjectId })
            .then(response => {
                dispatch({
                    type: GET_CONNECTION,
                    payload: response.data
                });
                if (success) {
                    success(response.data);
                }
            })
            .catch(() => {
            });
    }
}

// ===========================================================================


export const deleteConnection = (connectionId, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/connection/delete", { connectionId })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updateAvatar = (userId, url, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/avatar/update", { userId, url })
        .then(response => {
            dispatch(loadProfile(response.data.username))
            dispatch(fetchCurrentUser())
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================



