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
import Filmes from "../screens/filmes/Filmes";
import AdicionarFilme from "../screens/filmes/AdicionarFilme";
import AlterarFilme from "../screens/filmes/AlterarFilme";
import Locacoes from "../screens/locacoes/Locacoes";
import NovaLocacao from "../screens/locacoes/NovaLocacao";

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
                    <Route path="filmes" element={
                        <Outlet />
                    }>
                        <Route path="" element={<LayoutBase> <Filmes /> </LayoutBase>} />    
                        <Route path="adicionar-filme" element={<LayoutBase> <AdicionarFilme /> </LayoutBase>} />  
                        <Route path="alterar/:idFilme" element={<LayoutBase> <AlterarFilme /> </LayoutBase>} />                  
                        <Route path={"*"} element={
                            <Navigate to="" />
                        } />
                    </Route>
                    <Route path="locacoes" element={
                        <Outlet />
                    }>
                        <Route path="" element={<LayoutBase> <Locacoes /> </LayoutBase>} /> 
                        <Route path="nova-locacao" element={<LayoutBase> <NovaLocacao /> </LayoutBase>} />
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
