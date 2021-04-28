import {
    LOAD_TICKER,
    LOAD_TICKER_SUCCESS,
    CLEAR_TICKER,
    GET_FOLLOWERS_OF_TICKER,
    GET_CONNECTION_TO_TICKER,
    GET_FEATURED_FOLLOWERS,
    SET_ACTIVE_FEATURED_VIDEO
} from '../actions/types';

import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

// ===========================================================================

export const loadTicker = (symbol, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_TICKER
    });

    await api
        .post("/public/tickers/item", { symbol })
        .then(response => {

            dispatch({
                type: LOAD_TICKER_SUCCESS,
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


export const clearTicker = (success) => async (
    dispatch,
	getState,
	api
) => {


    dispatch({
        type: CLEAR_TICKER
    });
}


// ===========================================================================


export const getTickerFollowers = (symbol, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/public/ticker/get_followers", { symbol })
        .then(response => {
            dispatch({
                type: GET_FOLLOWERS_OF_TICKER,
                payload: response.data.count,
                featuredFollowers: response.data.featured
            });
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


// ===========================================================================


export const getTickerConnection = (userId, symbol, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/public/ticker/get_connection", { symbol, userId })
        .then(response => {
            dispatch({
                type: GET_CONNECTION_TO_TICKER,
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

export const setActiveFeaturedVideo = (video, success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: SET_ACTIVE_FEATURED_VIDEO,
        video: video
    });
}

// ===========================================================================


export const updateTicker = (tickerId, values, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/public/ticker/update", {
            tickerId,
            name: values.name
        })
        .then(response => {
            console.log(response)
            dispatch(loadTicker(response.data.ticker.metadata.symbol))
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

