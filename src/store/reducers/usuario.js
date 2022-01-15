import { CARREGANDO_USUARIO, DESCONECTAR, SET_USUARIO, USUARIO_CARREGADO } from '../actions/actionTypes'

const initialState = {
    usuario: '',
    carregando: false,
    autenticado: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case DESCONECTAR: {
            return {
                ...initialState
            }
        }
        case CARREGANDO_USUARIO: {
            return {
                ...state,
                carregando: true
            }
        }
        case USUARIO_CARREGADO: {
            return {
                ...state,
                carregando: false,
                autenticado: action.payload
            }
        }
        case SET_USUARIO: {
            return {
                ...state,
                ...action.payload
            }
        }        
        default: {
            return state
        }
    }
}

export default reducer