import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchOffice} from "../../store/actions";

const Offices = () => {
    const dispatch = useDispatch();
    const office = useSelector(state => state.offices.office)

    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchOffice(id));
    }, [dispatch, id]);


    if (office != null) {
        return (
            <div className="container">
                <header>КГТУ им. Раззакова</header>
                <div className="office">
                    <h1 className="officeName">{office[0].num}</h1>
                    <p><b>{office[0].nameKg}</b></p>
                    <p><b>{office[0].nameRu}</b></p>
                    <p><b>{office[0].nameEn}</b></p>
                    <h4 className="officeDescription">Описание Аудитории:</h4>
                    <p>{office[0].description}</p>
                    <p><b>Ответсвенный за аудиторию: </b>{office[0].manager}</p>
                    <p><b>Номер ответсвенного:</b> {office[0].managerNum}</p>
                    <p><b>Почта ответсвенного:</b> {office[0].managerMail}</p>
                </div>

            </div>
        );
    } else {
        return (
            <></>
        );
    }

};

export default Offices;