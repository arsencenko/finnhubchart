import { UPDATE_SYMBOL } from "../types/index.js";

export const updateSymbol = (data) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_SYMBOL, payload: data });
    }
}