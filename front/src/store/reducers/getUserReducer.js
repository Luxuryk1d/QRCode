import {GET_USER} from "../actionTypes";

const initialState = {
    user: null,
};

const getUser = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {...state, user: action.value};
        default:
            return state;
    }
};

export default getUser;