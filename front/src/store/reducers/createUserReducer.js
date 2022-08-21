import {ADD_PASSWORD, ADD_USERNAME} from "../actionTypes";

const initialState = {
    username: "",
    password: ""
};

const createUser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USERNAME:
            return {...state, username: action.value};
        case ADD_PASSWORD:
            return {...state, password: action.value};
        default:
            return state;
    }
};

export default createUser;