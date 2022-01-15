import {
    ADICIONAR_CLIENTE_CARREGADO,
    ALTERAR_CLIENTE_CARREGADO,
    CARREGANDO_ADICIONAR_CLIENTE,
    CARREGANDO_ALTERAR_CLIENTE,
    CARREGANDO_CLIENTES, CARREGANDO_EXCLUIR_CLIENTE, CLIENTES_CARREGADOS, EXCLUIR_CLIENTE_CARREGADO, LIMPA_ADICIONAR_CLIENTE, LIMPA_ALTERAR_CLIENTE, LIMPA_CLIENTES, LIMPA_EXCLUIR_CLIENTE, SET_CLIENTES, SET_MENSAGEM_ADICIONAR_CLIENTE, SET_MENSAGEM_ALTERAR_CLIENTE, SET_MENSAGEM_EXCLUIR_CLIENTE
} from '../actions/actionTypes'

const initialState = {
    clientes: [],
    ultimoIdAdicionado: 0,
    carregando: false,
    sincronizado: false,
    carregandoAdicionar: false,
    tentativaAdicionar: false,
    sucessoAdicionar: false,
    mensagemAdicionar: {
        tipo: '',
        mensagem: ''
    },
    carregandoAlterar: false,
    tentativaAlterar: false,
    sucessoAlterar: false,
    mensagemAlterar: {
        tipo: '',
        mensagem: ''
    },
    carregandoExcluir: false,
    tentativaExcluir: false,
    sucessoExcluir: false,
    mensagemExcluir: {
        tipo: '',
        mensagem: ''
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case LIMPA_CLIENTES: {
            return {
                ...initialState
            }
        }
        case CARREGANDO_CLIENTES: {
            return {
                ...state,
                carregando: true
            }
        }
        case CLIENTES_CARREGADOS: {
            return {
                ...state,
                carregando: false,
                sincronizado: action.payload
            }
        }
        case SET_CLIENTES: {
            return {
                ...state,
                ...action.payload
            }
        }
        case CARREGANDO_ADICIONAR_CLIENTE: {
            return {
                ...state,
                carregandoAdicionar: true,
            }
        }
        case ADICIONAR_CLIENTE_CARREGADO: {
            return {
                ...state,
                carregandoAdicionar: false,
                tentativaAdicionar: true,
                sucessoAdicionar: action.payload
            }
        }
        case SET_MENSAGEM_ADICIONAR_CLIENTE: {
            return {
                ...state,
                mensagemAdicionar: action.payload
            }
        }
        case LIMPA_ADICIONAR_CLIENTE: {
            return {
                ...state,
                carregandoAdicionar: false,
                tentativaAdicionar: false,
                sucessoAdicionar: false,
                mensagemAdicionar: {
                    tipo: '',
                    mensagem: ''
                }
            }
        }
        case CARREGANDO_ALTERAR_CLIENTE: {
            return {
                ...state,
                carregandoAlterar: true,
            }
        }
        case ALTERAR_CLIENTE_CARREGADO: {
            return {
                ...state,
                carregandoAlterar: false,
                tentativaAlterar: true,
                sucessoAlterar: action.payload
            }
        }
        case SET_MENSAGEM_ALTERAR_CLIENTE: {
            return {
                ...state,
                mensagemAlterar: action.payload
            }
        }
        case LIMPA_ALTERAR_CLIENTE: {
            return {
                ...state,
                carregandoAlterar: false,
                tentativaAlterar: false,
                sucessoAlterar: false,
                mensagemAlterar: {
                    tipo: '',
                    mensagem: ''
                }
            }
        }
        case CARREGANDO_EXCLUIR_CLIENTE: {
            return {
                ...state,
                carregandoExcluir: true,
            }
        }
        case EXCLUIR_CLIENTE_CARREGADO: {
            return {
                ...state,
                carregandoExcluir: false,
                tentativaExcluir: true,
                sucessoExcluir: action.payload
            }
        }
        case SET_MENSAGEM_EXCLUIR_CLIENTE: {
            return {
                ...state,
                mensagemExcluir: action.payload
            }
        }
        case LIMPA_EXCLUIR_CLIENTE: {
            return {
                ...state,
                carregandoExcluir: false,
                tentativaExcluir: false,
                sucessoExcluir: false,
                mensagemExcluir: {
                    tipo: '',
                    mensagem: ''
                }
            }
        }
        default: {
            return state
        }
    }
}

export default reducer