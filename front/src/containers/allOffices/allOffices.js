import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchOffices} from "../../store/actions";
import Office from "../../components/Office";
import {NavLink} from "react-router-dom";
import { Navigate } from 'react-router-dom';


const AllOffices = () => {
    const dispatch = useDispatch();
    const offices = useSelector(state => state.offices.offices);
    const user = useSelector(state => state.getUser.user);

    useEffect(() => {
        dispatch(fetchOffices());
    }, [dispatch]);

    if (user === null) {
        return <Navigate to="/"/>
    }

    if (offices !== null) {
        const officesList = offices.map((office, index) => {
            return (
                <Office key={index} num={office.num} nameKg={office.nameKg}
                        nameRu={office.nameRu} nameEn={office.nameEn} officeId={office.officeId}/>
            );
        });

        return (
            <div className="container">
                <header>КГТУ им. И.Раззакова</header>
                <div style={{marginTop: '15px'}}>
                    <button className="customBtn addBtn">

                        <NavLink
                            style={{
                                textDecoration: "none"
                            }}
                            to={"/adminPanel"}>
                                <span>
                                    Админ Панель
                                </span>
                        </NavLink>

                    </button>
                </div>
                <div className="offices">
                    {officesList}
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <header>Политех</header>
                <div style={{marginTop: '15px'}}>
                    <button className="customBtn addBtn">

                        <NavLink
                            style={{
                                textDecoration: "none"
                            }}
                            to={"/adminPanel"}>
                                <span>
                                    Админ Панель
                                </span>
                        </NavLink>

                    </button>
                </div>
            </div>
        )
    }
};

export default AllOffices;