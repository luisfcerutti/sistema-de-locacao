import {
    ADICIONAR_FILME_CARREGADO,
    ALTERAR_FILME_CARREGADO,
    CARREGANDO_ADICIONAR_FILME,
    CARREGANDO_ALTERAR_FILME,
    CARREGANDO_FILMES, CARREGANDO_EXCLUIR_FILME, FILMES_CARREGADOS, EXCLUIR_FILME_CARREGADO, LIMPA_ADICIONAR_FILME, LIMPA_ALTERAR_FILME, LIMPA_FILMES, LIMPA_EXCLUIR_FILME, SET_FILMES, SET_MENSAGEM_ADICIONAR_FILME, SET_MENSAGEM_ALTERAR_FILME, SET_MENSAGEM_EXCLUIR_FILME
} from '../actions/actionTypes'

const initialState = {
    filmes: [],
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
        case LIMPA_FILMES: {
            return {
                ...initialState
            }
        }
        case CARREGANDO_FILMES: {
            return {
                ...state,
                carregando: true
            }
        }
        case FILMES_CARREGADOS: {
            return {
                ...state,
                carregando: false,
                sincronizado: action.payload
            }
        }
        case SET_FILMES: {
            return {
                ...state,
                ...action.payload
            }
        }
        case CARREGANDO_ADICIONAR_FILME: {
            return {
                ...state,
                carregandoAdicionar: true,
            }
        }
        case ADICIONAR_FILME_CARREGADO: {
            return {
                ...state,
                carregandoAdicionar: false,
                tentativaAdicionar: true,
                sucessoAdicionar: action.payload
            }
        }
        case SET_MENSAGEM_ADICIONAR_FILME: {
            return {
                ...state,
                mensagemAdicionar: action.payload
            }
        }
        case LIMPA_ADICIONAR_FILME: {
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
        case CARREGANDO_ALTERAR_FILME: {
            return {
                ...state,
                carregandoAlterar: true,
            }
        }
        case ALTERAR_FILME_CARREGADO: {
            return {
                ...state,
                carregandoAlterar: false,
                tentativaAlterar: true,
                sucessoAlterar: action.payload
            }
        }
        case SET_MENSAGEM_ALTERAR_FILME: {
            return {
                ...state,
                mensagemAlterar: action.payload
            }
        }
        case LIMPA_ALTERAR_FILME: {
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
        case CARREGANDO_EXCLUIR_FILME: {
            return {
                ...state,
                carregandoExcluir: true,
            }
        }
        case EXCLUIR_FILME_CARREGADO: {
            return {
                ...state,
                carregandoExcluir: false,
                tentativaExcluir: true,
                sucessoExcluir: action.payload
            }
        }
        case SET_MENSAGEM_EXCLUIR_FILME: {
            return {
                ...state,
                mensagemExcluir: action.payload
            }
        }
        case LIMPA_EXCLUIR_FILME: {
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