import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

export const searchConnections = (type, identifier, offset, limit, query, success) => async (
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
        .post("/connections/search", {
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