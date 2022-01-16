import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";
import { useSelector } from "react-redux";

import Inicio from "../screens/inicio/Inicio";
import Login from "../screens/login/Login";
import LayoutBase from "../common/LayoutBase";

function DesconectarNecessario({ children }) {

    const usuario = useSelector((state) => state.usuario)

    return !usuario.autenticado ? children : <Navigate to="/" />;
}

function AcessoNecessario({ children }) {

    const usuario = useSelector((state) => state.usuario)

    return usuario.autenticado ? children : <Navigate to="/login" />;
}

export default function RouterPrincipal() {

    return (
        <Router>
            <Routes
            >
                <Route path="/login" element={
                    <DesconectarNecessario>
                        <Login />
                    </DesconectarNecessario>
                } />
                <Route path="/" element={
                    <AcessoNecessario>
                        <Outlet />
                    </AcessoNecessario>
                }>
                    <Route path="" element={<LayoutBase> <Inicio /> </LayoutBase>} />                    
                </Route>
                <Route path={"*"} element={
                  <Navigate to="/" />
                } />
            </Routes>
        </Router>
    );
}
