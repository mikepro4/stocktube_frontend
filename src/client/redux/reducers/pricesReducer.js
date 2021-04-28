import {
    ADD_PRICE_WEEK,
    ADD_PRICE_WEEK_SUCCESS,
    CLEAR_PRICES
} from "../actions/types";

  import * as _ from "lodash";
  
  export const initialState = {
    loading: false,
    current: [],
    day: [],
    week: [],
    month: [],
    year: [],
    fiveYears: [],
    max: []
  };
  
  export const pricesReducer = (state = initialState, action) => {
      switch (action.type) {
        case ADD_PRICE_WEEK:
            return {
                ...state,
                loading: true
            }
        case ADD_PRICE_WEEK_SUCCESS:
            let newWeek = [] 
                
            newWeek = [
                ...state.week,
                {
                    symbol: action.symbol,
                    series: action.payload
                }
            ]
            // let newWeek = state.week.push(action.payload)
            return {
                ...state,
                loading: false,
                week: newWeek
            }
        case CLEAR_PRICES:
            return initialState
        default:
            return state;
        }
  };
  