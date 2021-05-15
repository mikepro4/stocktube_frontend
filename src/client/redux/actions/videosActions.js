import * as _ from "lodash";

import {
    LOAD_VIDEO,
    LOAD_VIDEO_SUCCESS,
    CLEAR_VIDEO,
} from '../actions/types';


// ===========================================================================

export const searchVideos = (type, identifier, offset, limit, query, success) => async (
    dispatch,
	getState,
	api
) => {
    let params 

    if(type == "ticker-video-suggestions") {

        params = {
            criteria: {
                symbol: identifier
            },
            sortProperty: "createdAt",
            offset: offset,
            limit: limit,
            order: "-1"
        }
    }

    await api
        .post("/public/videos/search", params)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================

export const disableVideo = (videoId, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/public/video/disable", { videoId })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


// ===========================================================================

export const loadVideo = (id, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_VIDEO
    });

    await api
        .post("/public/videos/item", { googleId: id })
        .then(response => {

            dispatch({
                type: LOAD_VIDEO_SUCCESS,
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

export const preloadVideo = (video, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_VIDEO_SUCCESS,
        payload: video
    });

    if (success) {
        success(video);
    }
}

// ===========================================================================


export const clearVideo = () => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: CLEAR_VIDEO
    });
}