import * as _ from "lodash";

export const searchVideos = (type, identifier, offset, limit, query, success) => async (
    dispatch,
	getState,
	api
) => {
    let params 

    if(type == "ticker-video-suggestions") {

        params = {
            criteria: {
                "matadata.symbol": identifier
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