// eslint-disable-next-line no-unused-vars
import { ADD_CITY, REMOVE_CITY, SET_ERROR } from '../action-types'

export function addCity(payload){
    return { type: "ADD_CITY", payload }
}

export function removeCity(payload){
    return { type: "REMOVE_CITY", payload }
}

export function setError(payload){
    return { type: "SET_ERROR", payload }
}

