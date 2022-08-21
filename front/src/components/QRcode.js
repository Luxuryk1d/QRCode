import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';

const QR = () => {
    const [qr, setQr] = useState("")
    const {id} = useParams();

    useEffect(() => {
        QRCode.toDataURL(id).then((data) => {
            setQr(data);
        })
    }, [id]);

    const saveQr = () => {
        saveAs(qr, "qrCode.png")
    }

    return (
        <div className="container">
            <img className="qrCode" src={qr} alt=""/>
            <button onClick={saveQr}>Save Qr</button>
        </div>
    )
};

export default QR;
