// eslint-disable-next-line no-unused-vars
import { ADD_CITY, REMOVE_CITY, GET_WEATHER, ADD_CITY_WEATHER } from '../action-types'

export function addCity(payload){
    return { type: "ADD_CITY", payload }
}

export function removeCity(payload){
    return { type: "REMOVE_CITY", payload }
}

export function getFavoriteWeather(payload){
    return { type: "GET_WEATHER", payload }
}

export function addCityWeather(payload){
    return { type: "ADD_CITY_WEATHER", payload }
}
