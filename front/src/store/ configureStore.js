import {applyMiddleware, combineReducers, createStore} from "redux";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import thunkMiddleware from "redux-thunk";
import addOfficeReducer from "./reducers/addOfficeReducer";
import getOfficeReducer from "./reducers/getOfficeReducer";
import getUser from "./reducers/getUserReducer";
import createUser from "./reducers/createUserReducer";

const rootReducers = combineReducers({
    offices: getOfficeReducer,
    addOffice: addOfficeReducer,
    getUser: getUser,
    createUser: createUser,
});

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducers, persistedState, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    saveToLocalStorage({
        getUser: {
            user: store.getState().getUser.user
        }
    });
});

export default store;