import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {
    addManagerMail,
    addManagerNum, addOfficeDescription, addOfficeId,
    addOfficeManager,
    addOfficeNameEn,
    addOfficeNameKg,
    addOfficeNameRu, addOfficeNum, deleteOffice, editOffice,
    fetchOffice
} from "../../store/actions";
import { Navigate } from 'react-router-dom';
import QRCode from "qrcode";
import {nanoid} from 'nanoid';
import { saveAs } from 'file-saver';



const EditOffice = () => {

    const dispatch = useDispatch();
    const num = useSelector(state => state.addOffice.num);
    const office = useSelector(state => state.offices.office);
    const description = useSelector(state => state.addOffice.description);
    const manager = useSelector(state => state.addOffice.manager);
    const managerNum = useSelector(state => state.addOffice.managerNum);
    const managerMail = useSelector(state => state.addOffice.managerMail);
    const nameRu = useSelector(state => state.addOffice.nameRu);
    const nameKg = useSelector(state => state.addOffice.nameKg);
    const nameEn = useSelector(state => state.addOffice.nameEn);
    const officeData = useSelector(state => state.addOffice);
    const user = useSelector(state => state.getUser.user);


    const {id} = useParams();

    const [qr, setQr] = useState(id);
    const [qrImg, setQrImg] = useState("");

    useEffect(() => {
        QRCode.toDataURL(qr).then((data) => {
            setQrImg(data);
        })
    }, [qr]);

    const [winDisplay, setWinDisplay] = useState("none");
    const [winText, setWinText] = useState("");

    const hideWindow = () => {
        setWinDisplay("none")
    }

    useEffect(() => {
        dispatch(fetchOffice(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(addOfficeId(id));
    }, [dispatch, id]);

    const edit = async (event) => {
        setWinText("Кабинет отредактирован!")
        setWinDisplay("block");
        event.preventDefault();
        await editOffice(id, officeData);
        dispatch(addOfficeNum(""));
        dispatch(addOfficeNameKg(""));
        dispatch(addOfficeNameRu(""));
        dispatch(addOfficeNameEn(""));
        dispatch(addOfficeManager(""));
        dispatch(addOfficeDescription(""));
        dispatch(addManagerNum(""));
        dispatch(addManagerMail(""));
        dispatch(addOfficeId(""));
        setQr(nanoid());
    };

    const delOffice= async (event) => {
        setWinText("Кабинет удален!")
        setWinDisplay("block");
        event.preventDefault();
        await deleteOffice(id);
        dispatch(addOfficeNum(""));
        dispatch(addOfficeNameKg(""));
        dispatch(addOfficeNameRu(""));
        dispatch(addOfficeNameEn(""));
        dispatch(addOfficeManager(""));
        dispatch(addOfficeDescription(""));
        dispatch(addManagerNum(""));
        dispatch(addManagerMail(""));
        dispatch(addOfficeId(""));
    };

    useEffect(() => {
        if (office !== null) {
            dispatch(addOfficeNum(office[0].num))
            dispatch(addOfficeId(office[0].officeId));
            dispatch(addOfficeNameKg(office[0].nameKg));
            dispatch(addOfficeNameRu(office[0].nameRu));
            dispatch(addOfficeNameEn(office[0].nameEn));
            dispatch(addOfficeManager(office[0].manager));
            dispatch(addManagerNum(office[0].managerNum));
            dispatch(addManagerMail(office[0].managerMail));
            dispatch(addOfficeDescription(office[0].description));
        }
    }, [dispatch, office]);


    const addNumHandler = event => {
        dispatch(addOfficeNum(event.target.value));
    };

    const addNameKgHandler = event => {
        dispatch(addOfficeNameKg(event.target.value));
    };

    const addNameRuHandler = event => {
        dispatch(addOfficeNameRu(event.target.value));
    };

    const addNameEnHandler = event => {
        dispatch(addOfficeNameEn(event.target.value));
    };

    const addManagerHandler = event => {
        dispatch(addOfficeManager(event.target.value));
    };

    const addManagerNumHandler = event => {
        dispatch(addManagerNum(event.target.value));
    };

    const addManagerMailHandler = event => {
        dispatch(addManagerMail(event.target.value));
    };

    const addDescriptionHandler = event => {
        dispatch(addOfficeDescription(event.target.value));
    };

    if (user === null) {
        return <Navigate to="/"/>
    }

    const saveQr = () => {
        saveAs(qrImg, num + "qrCode.png");
    }

    if (office !== null) {
        return (
            <div className="container">
                <header>
                    КГТУ им. Раззакова
                </header>
                <div style={{display: winDisplay}} className="window">
                    <p>{winText}</p>
                    <button onClick={hideWindow} className="customBtn addBtn">

                        <NavLink
                            style={{
                                textDecoration: "none"
                            }}
                            to={"/offices"}>
                                <span>
                                    Ok
                                </span>
                        </NavLink>

                    </button>
                </div>
                <div className="deleteBtn">
                    <button onClick={delOffice}>Удалить кабинет</button>
                </div>
                <div className="fields">
                    <input type="text" value={num} onChange={addNumHandler}
                           placeholder="Введите Номер и корпус кабинета" className="creatingField"/>
                    <input type="text" value={nameKg} onChange={addNameKgHandler}
                           placeholder="Введите Название на Кыргызском" className="creatingField"/>
                    <input type="text" value={nameRu} onChange={addNameRuHandler}
                           placeholder="Введите Название на Русском" className="creatingField"/>
                    <input type="text" value={nameEn} onChange={addNameEnHandler}
                           placeholder="Введите Название на Английском" className="creatingField"/>
                    <input type="text" value={manager} onChange={addManagerHandler}
                           placeholder="Отвечающий за кабинет" className="creatingField"/>
                    <input type="text" value={managerNum} onChange={addManagerNumHandler}
                           placeholder="Номер отвечающего за кабинет" className="creatingField"/>
                    <input type="text" value={managerMail} onChange={addManagerMailHandler}
                           placeholder="Почта отвечающего за кабинет" className="creatingField"/>
                    <textarea value={description} onChange={addDescriptionHandler}
                              className="descriptionField" placeholder="Описание кабинета"/>
                </div>
                <div className="btn">
                    <button onClick={edit} type="button" className="customBtn addBtn" >
                        <span>Изменить</span>
                    </button>
                </div>
                <div className="saveQrWindow">
                    <img className="qrCode" src={qrImg} alt=""/>
                    <div className="saveQrBtn">
                        <button onClick={saveQr} className="customBtn addBtn"><span>Скачать QrCode</span></button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <header>
                    Политех
                </header>
            </div>
        );
    }

};

export default EditOffice;