import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addOfficeNum, addOfficeNameRu, addOfficeNameKg, addOfficeNameEn, addOfficeManager,
    addOfficeDescription, addNewOffice, addOfficeId, addManagerNum, addManagerMail, logOutUser
} from "../../store/actions";
import {nanoid} from 'nanoid';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import {NavLink} from "react-router-dom";
import { Navigate } from 'react-router-dom';


const AdminPanel = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.getUser.user);
    const num = useSelector(state => state.addOffice.num);
    const description = useSelector(state => state.addOffice.description);
    const manager = useSelector(state => state.addOffice.manager);
    const managerNum = useSelector(state => state.addOffice.managerNum);
    const managerMail = useSelector(state => state.addOffice.managerMail);
    const nameRu = useSelector(state => state.addOffice.nameRu);
    const nameKg = useSelector(state => state.addOffice.nameKg);
    const nameEn = useSelector(state => state.addOffice.nameEn);
    const officeData = useSelector(state => state.addOffice);


    const [winDisplay, setWinDisplay] = useState("none");

    const [qr, setQr] = useState(nanoid());
    const [qrImg, setQrImg] = useState("")

    useEffect(() => {
        QRCode.toDataURL(qr).then((data) => {
            setQrImg(data);
        })
    }, [qr]);


    const saveQr = async event => {
        saveAs(qrImg, num + "qrCode.png");
        setWinDisplay("none");
        event.preventDefault();
        const formData = new FormData();
        Object.keys(officeData).forEach(key => {
            formData.append(key, officeData[key]);
        });
        await addNewOffice(formData);
        dispatch(addOfficeNum(""));
        dispatch(addOfficeNameKg(""));
        dispatch(addOfficeNameRu(""));
        dispatch(addOfficeNameEn(""));
        dispatch(addOfficeManager(""));
        dispatch(addOfficeDescription(""));
        dispatch(addManagerNum(""));
        dispatch(addManagerMail(""));
        dispatch(addOfficeId(qr));
        setQr(nanoid());
    };

    useEffect(() => {
        dispatch(addOfficeId(qr));
    }, [dispatch, qr]);

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
    const sendOffice = () => {
        setWinDisplay("block");
    };

    if (user === null) {
        return <Navigate to="/"/>
    }

    const logOut = () => {
        dispatch(logOutUser(user.token))
    }

    return (
        <div className="container">
            <header>???????? ????. ??????????????????</header>
            <div className="logOut">
                <button onClick={logOut} className="logOutBtn">??????????</button>
            </div>
            <button style={{
                marginTop: "15px"
            }} className="customBtn addBtn">

                <NavLink
                    style={{
                        textDecoration: "none"
                    }}
                    to={"/offices"}>
                    <span>
                        ?????? ????????????????
                    </span>
                </NavLink>
            </button>

            <div style={{display: winDisplay}} className="window">
                <img className="qrCode" src={qrImg} alt=""/>
                <p>?????????????? ?????????????? ????????????????!</p>
                <button onClick={saveQr} className="customBtn addBtn"><span>?????????????? QrCode</span></button>
            </div>
            <div className="fields">
                <input type="text" value={num} onChange={addNumHandler}
                       placeholder="?????????????? ?????????? ?? ???????????? ????????????????" className="creatingField"/>
                <input type="text" value={nameKg} onChange={addNameKgHandler}
                       placeholder="?????????????? ???????????????? ???? ????????????????????" className="creatingField"/>
                <input type="text" value={nameRu} onChange={addNameRuHandler}
                       placeholder="?????????????? ???????????????? ???? ??????????????" className="creatingField"/>
                <input type="text" value={nameEn} onChange={addNameEnHandler}
                       placeholder="?????????????? ???????????????? ???? ????????????????????" className="creatingField"/>
                <input type="text" value={manager} onChange={addManagerHandler}
                       placeholder="???????????????????? ???? ??????????????" className="creatingField"/>
                <input type="text" value={managerNum} onChange={addManagerNumHandler}
                       placeholder="?????????? ?????????????????????? ???? ??????????????" className="creatingField"/>
                <input type="text" value={managerMail} onChange={addManagerMailHandler}
                       placeholder="?????????? ?????????????????????? ???? ??????????????" className="creatingField"/>
                <textarea value={description} onChange={addDescriptionHandler}
                          className="descriptionField" placeholder="???????????????? ????????????????"/>
            </div>
            <div className="btn">
                <button type="button" className="customBtn addBtn" onClick={sendOffice}>
                    <span>????????????????</span>
                </button>
            </div>
        </div>
    );
};

export default AdminPanel;