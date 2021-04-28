
import {
    ADD_PRICE_WEEK,
  ADD_PRICE_WEEK_SUCCESS,
  CLEAR_PRICES
} from "./types";

import axios from "axios";
import { reset } from "redux-form";
import moment from "moment";
import * as _ from "lodash";

// =============================================================================

export const searchPriceWeek = (symbol, success) => async (dispatch, getState, api) => {

  let symbolExists = _.findIndex(getState().prices.week, {
      symbol: symbol
  });

  if(symbolExists < 0) {
      let to = moment().format("YYYY-MM-DD")
      var from = moment().subtract(31, 'days').format("YYYY-MM-DD");
  
      dispatch({
          type: ADD_PRICE_WEEK
      });
  
      const res = await api.post("/prices/week", {
          symbol: symbol,
          from: from,
          to: to,
      });
  
      dispatch({
          type: ADD_PRICE_WEEK_SUCCESS,
          payload: res.data,
          symbol: symbol
      })
  
      if (success) {
          success(res.data);
      }
  }
}

// =============================================================================

export const findPriceWeek = (symbol, success) => async (dispatch, getState, api) => {

  let week = getState().prices.week;
  let symbolExists = _.findIndex(week, {
      symbol: symbol
  });

  if(symbolExists > -1) {
      return week
  } else {
      return []
  }
}
