// eslint-disable-next-line no-unused-vars
import {ADD_CITY, GET_CITIES, REMOVE_CITY, SET_ERROR } from "../action-types";

const initialState = {
    favorites: [],
    errorMessage: "",
    API_KEY: "bf17aa753eec52f73cdb8d53e0609031",
    API_URL: "https://api.openweathermap.org/data/2.5/weather?",
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_CITIES':
            return state.favorites;

        case 'ADD_CITY':
            return Object.assign({}, state, {
                favorites: state.favorites.concat(action.payload)
            });

        case 'REMOVE_CITY':
            return Object.assign({}, state, {
                favorites: state.favorites.filter(item => item.city !== action.payload)
            });

        case 'SET_ERROR':
            return Object.assign({}, state, {
                errorMessage: action.payload
            });

        default:
    }
    return state;
};

export default rootReducer;