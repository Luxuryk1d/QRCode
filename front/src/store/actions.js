import axios from "axios";

import {
    ADD_OFFICE_DESCRIPTION,
    ADD_OFFICE_IMAGE,
    ADD_OFFICE_MANAGER,
    ADD_OFFICE_NAME_RU,
    ADD_OFFICE_NAME_KG,
    ADD_OFFICE_NAME_EN,
    ADD_OFFICE_NUM,
    GET_OFFICE, ADD_OFFICE_ID,
    ADD_MANAGER_MAIL, ADD_MANAGER_NUM, GET_OFFICES, ADD_USERNAME, ADD_PASSWORD, GET_USER
} from "./actionTypes";

export const addUserName = value => {
    return {type: ADD_USERNAME, value};
};

export const addPassword = value => {
    return {type: ADD_PASSWORD, value};
};

export const fetchUser = value => {
    return {type: GET_USER, value};
};

export const getOffices = value => {
    return {type: GET_OFFICES, value};
};

export const getOffice = value => {
    return{type: GET_OFFICE, value};
};

export const addOfficeId = value => {
    return {type: ADD_OFFICE_ID, value}
}

export const addOfficeNum = value => {
    return {type: ADD_OFFICE_NUM, value};
};

export const addOfficeNameRu = value => {
    return {type: ADD_OFFICE_NAME_RU, value};
};

export const addOfficeNameKg = value => {
    return {type: ADD_OFFICE_NAME_KG, value};
};

export const addOfficeNameEn = value => {
    return {type: ADD_OFFICE_NAME_EN, value};
};

export const addOfficeDescription = value => {
    return {type: ADD_OFFICE_DESCRIPTION, value};
};

export const addOfficeManager = value => {
    return {type: ADD_OFFICE_MANAGER, value};
};

export const addManagerMail = value => {
    return {type: ADD_MANAGER_MAIL, value};
};

export const addManagerNum = value => {
    return {type: ADD_MANAGER_NUM, value};
};

export const addOfficeImage = value => {
    return {type: ADD_OFFICE_IMAGE, value}
};

export const registerUser = (data) => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:8000/users/sessions', data);
            dispatch(fetchUser(response.data));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(fetchUser(e.response.data));
            }
        }
    };
};

export const logOutUser = (token) => {
    return async dispatch => {
        try {
            const headers = {"Authentication": token};
            await axios.delete('http://localhost:8000/users/sessions', {headers});
            dispatch(fetchUser(null));
        } catch (e) {
            console.log(e);
        }
    };
};


export const createUser = (data) => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:8000/users', data);
            dispatch(fetchUser(response.data))
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(fetchUser(e.response.data));
            }
        }
    };
};

export const fetchOffices = () => {
    return async dispatch => {
        try {
            const response = await axios.get('http://localhost:8000/offices/');
            dispatch(getOffices(response.data));
        } catch (e) {
            console.log(e)
        }
    };
};

export const fetchOffice = (office) => {
    return async dispatch => {
        try {
            const response = await axios.get('http://localhost:8000/offices/' + office);
            dispatch(getOffice(response.data));
        } catch (e) {
            console.log(e)
        }
    };
};

export const addNewOffice = async (office) => {
    try {
        await axios.post('http://localhost:8000/offices', office);
    } catch (e) {
        console.log(e);
    }
};

export const editOffice = async (id, office) => {
    try {
        await axios.put('http://localhost:8000/offices/' + id, office);
    } catch (e) {
        console.log(e);
    }
};

export const deleteOffice = async (id) => {
    try {
        await axios.delete('http://localhost:8000/offices/' + id);
    } catch (e) {
        console.log(e);
    }
};