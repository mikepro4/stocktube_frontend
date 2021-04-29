import axios from "axios";
import { reset } from "redux-form";
import moment from "moment";
import * as _ from "lodash";

// =============================================================================

export const getTickerPrices = (symbol, success) => async (dispatch, getState, api) => {

    let to = moment().format("YYYY-MM-DD")
    var from = moment().subtract(31, 'days').format("YYYY-MM-DD");

    const res = await api.post("/public/ticker/prices", {
        symbol: symbol,
        from: from,
        to: to,
    });

    if (success) {
        success(res.data.history, res.data.current);
    }
}