import { ADD_CITY } from "../action-types";

const initialState = {
    favorites: []
};
function rootReducer(state = initialState, action) {
    if (action.type === ADD_CITY){
        return Object.assign({}, state, {
            favorites: state.favorites.concat(action.payload)
        });
    }
    return state;
};
export default rootReducer;