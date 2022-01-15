import { CARREGANDO_USUARIO, DESCONECTAR, SET_USUARIO, USUARIO_CARREGADO } from './actionTypes';

import { notification } from 'antd';
import { limpaFilmes, sincronizarFilmes } from './filmes';
import { limpaClientes, sincronizarClientes } from './clientes';
import { limpaLocacoes, sincronizarLocacoes } from './locacoes';

export const carregandoUsuario = () => {
    return {
        type: CARREGANDO_USUARIO
    }
}

export const usuarioCarregado = (autenticado) => {
    return {
        type: USUARIO_CARREGADO,
        payload: autenticado
    }
}

export const setUsuario = (usuario) => {
    return {
        type: SET_USUARIO,
        payload: usuario
    }
}

export const limpaUsuario = () => {
    return {
        type: DESCONECTAR
    }
}

export const deslogar = () => {
    return dispatch => {
        dispatch(limpaFilmes())
        dispatch(limpaClientes())
        dispatch(limpaLocacoes())
        dispatch(limpaUsuario())
    }
}

export const acessar = (dados) => {
    return dispatch => {
        dispatch(carregandoUsuario())

        setTimeout(() => {

            if(dados.usuario === 'admin' && dados.senha === '123456'){
                dispatch(usuarioCarregado(true))
                dispatch(setUsuario({ usuario: dados.usuario }))
                dispatch(sincronizarFilmes())
                dispatch(sincronizarClientes())
                dispatch(sincronizarLocacoes())
            }else{
                dispatch(usuarioCarregado(false))
                notification.error({
                    message: 'Erro',
                    description:
                        'Acesso negado'
                }) 
            }

        }, 2000)

    }
}