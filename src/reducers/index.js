import { UPDATE_SYMBOL } from "../types/index.js";

const initialState = {
    data: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_SYMBOL:
            return {
                ...state,
                data: [...state.data, ...action.payload.data]
            }
        default:
            return {
                ...state,
                data: []
            }
    }
}

export default reducer;