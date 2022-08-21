import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addPassword, addUserName, registerUser} from "../store/actions";
import { Navigate } from 'react-router-dom';

const Login =() => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.getUser.user);
    const userName = useSelector(state => state.createUser.username);
    const password = useSelector(state => state.createUser.password);
    const userData = useSelector(state => state.createUser)

    const addUserNameHandler = event => {
        dispatch(addUserName(event.target.value));
    };

    const addPasswordHandler = event => {
        dispatch(addPassword(event.target.value));
    };

    const regUserHandler = () => {
        dispatch(registerUser(userData));
        dispatch(addUserName(""));
        dispatch(addPassword(""));
    }

    if (user !== null && user.username) {
        return <Navigate to="/adminPanel"/>
    }

    return (
        <div className="container">
            <header>
                КГТУ им И. Раззакова
            </header>

            <input type="text" value={userName} onChange={addUserNameHandler}
                   placeholder="Логин" className="logField"/>
            <input type="text" value={password} onChange={addPasswordHandler}
                   placeholder="Пароль" className="logField"/>
            <div className="btn">
                <button onClick={regUserHandler} type="button" className="customBtn addBtn">
                    <span>Войти</span>
                </button>
                {user && <span className="error">{user.error}</span>}
            </div>
        </div>
    )
};

export default Login;