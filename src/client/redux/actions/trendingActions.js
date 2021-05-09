// ===========================================================================


export const searchTrending = (type, identifier, offset, limit, query, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/tickers/search", {
            criteria: {},
            sortProperty: "last24hours",
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