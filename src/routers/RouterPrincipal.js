import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";
import { useSelector } from "react-redux";

import LayoutBase from "../common/LayoutBase";

import Inicio from "../screens/inicio/Inicio";
import Login from "../screens/login/Login";
import Clientes from "../screens/clientes/Clientes";
import AdicionarCliente from "../screens/clientes/AdicionarCliente";
import AlterarCliente from "../screens/clientes/AlterarCliente";

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
                    <Route path="clientes" element={
                        <Outlet />
                    }>
                        <Route path="" element={<LayoutBase> <Clientes /> </LayoutBase>} />
                        <Route path="adicionar-cliente" element={<LayoutBase> <AdicionarCliente /> </LayoutBase>} />
                        <Route path="alterar/:idCliente" element={<LayoutBase> <AlterarCliente /> </LayoutBase>} />
                        <Route path={"*"} element={
                            <Navigate to="" />
                        } />
                    </Route>
                </Route>
                <Route path={"*"} element={
                    <Navigate to="/" />
                } />
            </Routes>
        </Router>
    );
}
