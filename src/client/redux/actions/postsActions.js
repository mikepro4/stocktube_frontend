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

import { fetchCurrentUser, authError } from "./authActions"


export const createPost = (postItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/posts/create", postItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}


// ===========================================================================



export const loadPost = (id, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/posts/item", { id })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}


// ===========================================================================


export const searchPosts = (userId, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/posts/search", {
            criteria: {
                userId: userId
            },
            sortProperty: "createdAt",
            offset: 0,
            limit: 20,
            order: "-1"
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const deletePost = (post, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/posts/delete", { post })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updatePost = (postId, postContent, linkedTickers, linkedUsers, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/post/update", { 
            postId, 
            linkedTickers,
            linkedUsers,
            content: postContent,
        })
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

