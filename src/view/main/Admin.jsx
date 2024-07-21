import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from "../header/Header";
import PageAdmin from "./PageAdmin";
import Users from "./Users";
import Tags from "./Tags";
import NewUser from "./NewUser";
import UpdateUser from "./UpdateUser";
import Perfil from "./Perfil";
import NewTag from "./NewTag";
import UpdateTag from "./UpdateTag";

function Admin() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="pageAdmin" />} />
                <Route path="pageAdmin" element={<PageAdmin />} />
                <Route path="users" element={<Users />} />
                <Route path="tags" element={<Tags />} />
                <Route path="newUser" element={<NewUser />} />
                <Route path="updateUser/:id" element={<UpdateUser />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="newTag" element={<NewTag />} />
                <Route path="updateTag/:id" element={<UpdateTag />} />
            </Routes>
        </div>
    );
}

export default Admin;