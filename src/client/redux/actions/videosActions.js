import * as _ from "lodash";

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