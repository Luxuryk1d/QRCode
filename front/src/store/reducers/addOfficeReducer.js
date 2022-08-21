import {
    ADD_OFFICE_DESCRIPTION,
    ADD_OFFICE_IMAGE,
    ADD_OFFICE_MANAGER,
    ADD_OFFICE_NAME_RU,
    ADD_OFFICE_NAME_EN,
    ADD_OFFICE_NAME_KG,
    ADD_OFFICE_NUM, ADD_OFFICE_ID,
    ADD_MANAGER_NUM, ADD_MANAGER_MAIL
} from "../actionTypes";

const initialState = {
    officeId: "",
    nameRu: "",
    nameKg: "",
    nameEn: "",
    description: "",
    manager: "",
    managerMail: "",
    managerNum: "",
    image: null,
    num: "",
};

const addOfficeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_OFFICE_ID:
            return {...state, officeId: action.value}
        case ADD_OFFICE_NAME_EN:
            return {...state, nameEn: action.value};
        case ADD_OFFICE_NAME_KG:
            return {...state, nameKg: action.value};
        case ADD_OFFICE_NAME_RU:
            return {...state, nameRu: action.value};
        case ADD_OFFICE_DESCRIPTION:
            return {...state, description: action.value};
        case ADD_OFFICE_MANAGER:
            return {...state, manager: action.value};
        case ADD_MANAGER_NUM:
            return {...state, managerNum: action.value};
        case ADD_MANAGER_MAIL:
            return {...state, managerMail: action.value};
        case ADD_OFFICE_IMAGE:
            return {...state, image: action.value};
        case ADD_OFFICE_NUM:
            return {...state, num: action.value};
        default:
            return state;
    }
};

export default addOfficeReducer;