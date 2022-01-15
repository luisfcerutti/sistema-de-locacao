import { ADICIONAR_LOCACAO_CARREGADO, ALTERAR_LOCACAO_CARREGADO, CARREGANDO_ADICIONAR_LOCACAO, CARREGANDO_ALTERAR_LOCACAO, CARREGANDO_LOCACOES, CARREGANDO_EXCLUIR_LOCACAO, LOCACOES_CARREGADOS, EXCLUIR_LOCACAO_CARREGADO, LIMPA_ADICIONAR_LOCACAO, LIMPA_ALTERAR_LOCACAO, LIMPA_LOCACOES, LIMPA_EXCLUIR_LOCACAO, SET_LOCACOES, SET_MENSAGEM_ADICIONAR_LOCACAO, SET_MENSAGEM_ALTERAR_LOCACAO, SET_MENSAGEM_EXCLUIR_LOCACAO } from "./actionTypes"

import moment from 'moment'
import { notification } from 'antd';

export const carregandoLocacoes = () => {
    return {
        type: CARREGANDO_LOCACOES
    }
}

export const locacoesCarregadas = (sincronizado) => {
    return {
        type: LOCACOES_CARREGADOS,
        payload: sincronizado
    }
}

export const setLocacoes = (dados) => {
    return {
        type: SET_LOCACOES,
        payload: dados
    }
}

export const limpaLocacoes = () => {
    return {
        type: LIMPA_LOCACOES
    }
}

export const sincronizarLocacoes = () => {
    return dispatch => {
        dispatch(carregandoLocacoes())

        setTimeout(() => {

            let locacoes = [
                {
                    idLocacao: 1,
                    idCliente: 3,
                    idFilme: 6,
                    dataLocacao: moment({ day: 1, month: 11, year: 2021 }).toDate(),
                    dataDevolucao: moment({ day: 3, month: 11, year: 2021 }).toDate(),
                    
                },
                {
                    idLocacao: 2,
                    idCliente: 4,
                    idFilme: 5,
                    dataLocacao: moment({ day: 4, month: 11, year: 2021 }).toDate(),
                    dataDevolucao: null
                },
                {
                    idLocacao: 3,
                    idCliente: 8,
                    idFilme: 8,
                    dataLocacao: moment({ day: 5, month: 11, year: 2021 }).toDate(),
                    dataDevolucao: moment({ day: 7, month: 11, year: 2021 }).toDate()
                },
                {
                    idLocacao: 4,
                    idCliente: 1,
                    idFilme: 10,
                    dataLocacao: moment({ day: 5, month: 11, year: 2021 }).toDate(),
                    dataDevolucao: null
                },
                {
                    idLocacao: 5,
                    idCliente: 5,
                    idFilme: 4,
                    dataLocacao: moment({ day: 10, month: 11, year: 2021 }).toDate(),
                    dataDevolucao: moment({ day: 12, month: 11, year: 2021 }).toDate()
                },
                {
                    idLocacao: 6,
                    idCliente: 2,
                    idFilme: 6,
                    dataLocacao: moment({ day: 15, month: 11, year: 2021 }).toDate(),
                    dataDevolucao: moment({ day: 17, month: 11, year: 2021 }).toDate()
                },
                {
                    idLocacao: 7,
                    idCliente: 3,
                    idFilme: 7,
                    dataLocacao: moment({ day: 15, month: 11, year: 2021 }).toDate(),
                    dataDevolucao: moment({ day: 17, month: 11, year: 2021 }).toDate()
                },
                {
                    idLocacao: 8,
                    idCliente: 9,
                    idFilme: 8,
                    dataLocacao: moment({ day: 18, month: 11, year: 2021 }).toDate(),
                    dataDevolucao: moment({ day: 20, month: 11, year: 2021 }).toDate()
                },
                {
                    idLocacao: 9,
                    idCliente: 3,
                    idFilme: 9,
                    dataLocacao: moment({ day: 4, month: 12, year: 2021 }).toDate(),
                    dataDevolucao: moment({ day: 6, month: 12, year: 2021 }).toDate()
                },
                {
                    idLocacao: 10,
                    idCliente: 1,
                    idFilme: 8,
                    dataLocacao: moment({ day: 5, month: 12, year: 2021 }).toDate(),
                    dataDevolucao: null
                }
            ]

            dispatch(setLocacoes({ locacoes, ultimoIdAdicionado: 10 }))
            dispatch(locacoesCarregadas(true))
        }, 2000)
    }
}

export const carregandoAdicionarLocacao = () => {
    return {
        type: CARREGANDO_ADICIONAR_LOCACAO
    }
}

export const adicionarLocacaoCarregado = (sucesso) => {
    return {
        type: ADICIONAR_LOCACAO_CARREGADO,
        payload: sucesso
    }
}

export const setMensagemAdicionarLocacao = (mensagem) => {
    return {
        type: SET_MENSAGEM_ADICIONAR_LOCACAO,
        payload: mensagem
    }
}

export const limpaAdicionarLocacao = () => {
    return {
        type: LIMPA_ADICIONAR_LOCACAO
    }
}

export const adicionaLocacao = (novaLocacao) => {
    return (dispatch, getState) => {
        dispatch(carregandoAdicionarLocacao())

        let { ultimoIdAdicionado, locacoes } = getState().locacoes

        setTimeout(() => {

            let novoId = ultimoIdAdicionado + 1

            let LOCACOESalvar = {
                ...novaLocacao,
                id: novoId
            }

            locacoes.push(LOCACOESalvar)

            dispatch(setLocacoes({ locacoes, ultimoIdAdicionado: novoId }))
            dispatch(adicionarLocacaoCarregado(true))

        }, 2000)
    }
}

export const carregandoAlterarLocacao = () => {
    return {
        type: CARREGANDO_ALTERAR_LOCACAO
    }
}

export const alterarLocacaoCarregado = (sucesso) => {
    return {
        type: ALTERAR_LOCACAO_CARREGADO,
        payload: sucesso
    }
}

export const setMensagemAlterarLocacao = (mensagem) => {
    return {
        type: SET_MENSAGEM_ALTERAR_LOCACAO,
        payload: mensagem
    }
}

export const limpaAlterarLocacao = () => {
    return {
        type: LIMPA_ALTERAR_LOCACAO
    }
}

export const alterarLocacao = (locacaoAlterar) => {
    return (dispatch, getState) => {
        dispatch(carregandoAlterarLocacao())

        let { locacoes } = getState().locacoes
        let indexLocacao = null

        locacoes.forEach((locacao, index) => {
            if (locacao.idLocacao === locacaoAlterar.idLocacao) {
                indexLocacao = index
            }
        })

        setTimeout(() => {
            if (indexLocacao !== null) {

                locacoes[indexLocacao] = { ...locacoes[indexLocacao], ...locacaoAlterar }

                dispatch(setLocacoes({ locacoes }))
                dispatch(alterarLocacaoCarregado(true))
            } else {
                dispatch(alterarLocacaoCarregado(false))
                notification.error({
                    message: 'Erro ao alterar locação',
                    description:
                        'Ocorreu um erro ao alterar a locação',
                    onClose: () => dispatch(limpaAlterarLocacao())
                })
            }
        }, 2000)
    }
}

export const carregandoExcluirLocacao = () => {
    return {
        type: CARREGANDO_EXCLUIR_LOCACAO
    }
}

export const excluirLocacaoCarregado = (sucesso) => {
    return {
        type: EXCLUIR_LOCACAO_CARREGADO,
        payload: sucesso
    }
}

export const setMensagemExcluirLocacao = (mensagem) => {
    return {
        type: SET_MENSAGEM_EXCLUIR_LOCACAO,
        payload: mensagem
    }
}

export const limpaExcluirLocacao = () => {
    return {
        type: LIMPA_EXCLUIR_LOCACAO
    }
}

export const excluirLocacao = (idExcluir) => {
    return (dispatch, getState) => {
        dispatch(carregandoExcluirLocacao())

        let { locacoes } = getState().locacoes
        let indexLocacao = null

        locacoes.forEach((locacao, index) => {
            if (locacao.idLocacao === idExcluir) {
                indexLocacao = index
            }
        })

        setTimeout(() => {
            if (indexLocacao !== null) {

                locacoes.splice(indexLocacao, 1)

                dispatch(setLocacoes({ locacoes }))
                dispatch(excluirLocacaoCarregado(true))
                notification.success({
                    message: 'Locação excluída',
                    description:
                        'A locação foi excluida com sucesso',
                    onClose: () => dispatch(limpaExcluirLocacao())
                })
            } else {
                dispatch(excluirLocacaoCarregado(false))
                notification.error({
                    message: 'Erro ao excluir locação',
                    description:
                        'Ocorreu um erro ao excluir a locação',
                    onClose: () => dispatch(limpaExcluirLocacao())
                })
            }
        }, 2000)
    }
}