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


export const searchPosts = (type, identifier, offset, limit, query, success) => async (
    dispatch,
	getState,
	api
) => {
    let criteria 

    if(type == "user") {
        criteria = {
            userId: identifier
        }
    }

    if(type == "ticker") {
        criteria = {
            symbol: identifier
        }
    }

    await api
        .post("/posts/search", {
            criteria: criteria,
            sortProperty: "createdAt",
            offset: offset,
            limit: limit,
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


export const deletePost = (postId, postItem, success) => async (
    dispatch,
	getState,
	api
) => {
    console.log(postId, postItem)
    await api
        .post("/posts/delete", { postId: postId, post: postItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updatePost = (postId, postItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/post/update", { 
            postId, 
            linkedTickers: postItem.linkedTickers,
            linkedUsers: postItem.linkedUsers,
            content: postItem.content
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

