import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AdminPanel from "../adminPanel/AdminPanel";
import Offices from "../offices/offices";
import QR from "../../components/QRcode";
import AllOffices from "../allOffices/allOffices";
import EditOffice from "../editOffice/EditOffice";
import Login from "../../components/LogIn";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/adminPanel" element={<AdminPanel/>}/>
                <Route exact path="/office/:id" element={<Offices/>}/>
                <Route exact path="/qr/:id" element={<QR/>}/>
                <Route exact path="/offices" element={<AllOffices/>}/>
                <Route exact path="/editOffice/:id" element={<EditOffice/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
