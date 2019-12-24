// eslint-disable-next-line no-unused-vars
import {ADD_CITY, REMOVE_CITY, GET_WEATHER, ADD_CITY_WEATHER} from "../action-types";
import {windToTextualDescription} from "../../utils";

export const initialState = {
    favoritesForecast: [],
    favorites: [],
    API_KEY: "bcec4b05cf3cf0fdcb2a74e73b9428e3",
    API_URL: "https://api.openweathermap.org/data/2.5/weather?",
};

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case 'ADD_CITY':
            return Object.assign({}, state, {
                favorites: state.favorites.concat(action.payload)
            });

        case 'ADD_CITY_WEATHER':
            return Object.assign({}, state, {
                favoritesForecast: state.favoritesForecast.concat(action.payload)
            });

        case 'REMOVE_CITY':
            return Object.assign({}, state, {
                favorites: state.favorites.filter(item => item !== action.payload),
                favoritesForecast: state.favoritesForecast.filter(item => item.city !== action.payload),
            });

        case 'GET_WEATHER':
            let favorites = [];
            state.favorites.map(item => {
                let link = state.API_URL
                    + "q="
                    + item
                    + "&units=metric"
                    + "&appid=" + state.API_KEY;

                //let weather;
                fetch(link)
                    .then(res => {
                        return res.json()
                    })
                    .then((result) => {
                        let weather = {
                            city: result.name,
                            temp: result.main.temp,
                            humidity: result.main.humidity,
                            windSpeed: result.wind.speed,
                            windDirection: windToTextualDescription(result.wind.deg),
                            pressure: result.main.pressure,
                            clouds: result.weather[0].description,
                            icon: result.weather[0].icon,
                            lon: result.coord.lon,
                            lat: result.coord.lat,
                        };
                        favorites.push(weather);
                    });
                //return weather;
            });
            return Object.assign({}, state, {
                favoritesForecast: favorites
            });

        default:
    }
    return state;
}

export default rootReducer;