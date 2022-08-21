import {GET_OFFICE, GET_OFFICES} from "../actionTypes";

const initialState = {
    office: null,
    offices: null
};

const getOfficeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_OFFICES:
            return {...state, offices: action.value};
        case GET_OFFICE:
            return {...state, office: action.value}
        default:
            return state;
    }
};

export default getOfficeReducer;
