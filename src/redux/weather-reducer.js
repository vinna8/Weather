import { GET_CURRENT_WEATHER, GET_DAILY_WEATHER } from "./types";

let initialState = {
    weatherCurrent: [],
    weatherDaily: [],
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_WEATHER:
            return {
                ...state,
                ...action.data,
            }
        case GET_DAILY_WEATHER:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state;
    }
}

export default weatherReducer;