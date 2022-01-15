import {
    ADICIONAR_LOCACAO_CARREGADO,
    ALTERAR_LOCACAO_CARREGADO,
    CARREGANDO_ADICIONAR_LOCACAO,
    CARREGANDO_ALTERAR_LOCACAO,
    CARREGANDO_LOCACOES, CARREGANDO_EXCLUIR_LOCACAO, LOCACOES_CARREGADOS, EXCLUIR_LOCACAO_CARREGADO, LIMPA_ADICIONAR_LOCACAO, LIMPA_ALTERAR_LOCACAO, LIMPA_LOCACOES, LIMPA_EXCLUIR_LOCACAO, SET_LOCACOES, SET_MENSAGEM_ADICIONAR_LOCACAO, SET_MENSAGEM_ALTERAR_LOCACAO, SET_MENSAGEM_EXCLUIR_LOCACAO
} from '../actions/actionTypes'

const initialState = {
    locacoes: [],
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
        case LIMPA_LOCACOES: {
            return {
                ...initialState
            }
        }
        case CARREGANDO_LOCACOES: {
            return {
                ...state,
                carregando: true
            }
        }
        case LOCACOES_CARREGADOS: {
            return {
                ...state,
                carregando: false,
                sincronizado: action.payload
            }
        }
        case SET_LOCACOES: {
            return {
                ...state,
                ...action.payload
            }
        }
        case CARREGANDO_ADICIONAR_LOCACAO: {
            return {
                ...state,
                carregandoAdicionar: true,
            }
        }
        case ADICIONAR_LOCACAO_CARREGADO: {
            return {
                ...state,
                carregandoAdicionar: false,
                tentativaAdicionar: true,
                sucessoAdicionar: action.payload
            }
        }
        case SET_MENSAGEM_ADICIONAR_LOCACAO: {
            return {
                ...state,
                mensagemAdicionar: action.payload
            }
        }
        case LIMPA_ADICIONAR_LOCACAO: {
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
        case CARREGANDO_ALTERAR_LOCACAO: {
            return {
                ...state,
                carregandoAlterar: true,
            }
        }
        case ALTERAR_LOCACAO_CARREGADO: {
            return {
                ...state,
                carregandoAlterar: false,
                tentativaAlterar: true,
                sucessoAlterar: action.payload
            }
        }
        case SET_MENSAGEM_ALTERAR_LOCACAO: {
            return {
                ...state,
                mensagemAlterar: action.payload
            }
        }
        case LIMPA_ALTERAR_LOCACAO: {
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
        case CARREGANDO_EXCLUIR_LOCACAO: {
            return {
                ...state,
                carregandoExcluir: true,
            }
        }
        case EXCLUIR_LOCACAO_CARREGADO: {
            return {
                ...state,
                carregandoExcluir: false,
                tentativaExcluir: true,
                sucessoExcluir: action.payload
            }
        }
        case SET_MENSAGEM_EXCLUIR_LOCACAO: {
            return {
                ...state,
                mensagemExcluir: action.payload
            }
        }
        case LIMPA_EXCLUIR_LOCACAO: {
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