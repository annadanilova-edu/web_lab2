import { createStore } from "redux";
import rootReducer from "./reducers/index";
import { initialState } from "./reducers/index";

//const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : initialState;

const persistedState = initialState;
if (localStorage.getItem('reduxState')){
    persistedState.favorites = JSON.parse(localStorage.getItem('reduxState'));
}

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState().favorites))
});

export default store;