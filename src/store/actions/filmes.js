import { ADICIONAR_FILME_CARREGADO, ALTERAR_FILME_CARREGADO, CARREGANDO_ADICIONAR_FILME, CARREGANDO_ALTERAR_FILME, CARREGANDO_FILMES, CARREGANDO_EXCLUIR_FILME, FILMES_CARREGADOS, EXCLUIR_FILME_CARREGADO, LIMPA_ADICIONAR_FILME, LIMPA_ALTERAR_FILME, LIMPA_FILMES, LIMPA_EXCLUIR_FILME, SET_FILMES, SET_MENSAGEM_ADICIONAR_FILME, SET_MENSAGEM_ALTERAR_FILME, SET_MENSAGEM_EXCLUIR_FILME } from "./actionTypes"

import { notification } from 'antd';

export const carregandoFilmes = () => {
    return {
        type: CARREGANDO_FILMES
    }
}

export const filmesCarregados = (sincronizado) => {
    return {
        type: FILMES_CARREGADOS,
        payload: sincronizado
    }
}

export const setFilmes = (dados) => {
    return {
        type: SET_FILMES,
        payload: dados
    }
}

export const limpaFilmes = () => {
    return {
        type: LIMPA_FILMES
    }
}

export const sincronizarFilmes = () => {
    return dispatch => {
        dispatch(carregandoFilmes())

        setTimeout(() => {

            let filmes = [
                {
                    idFilme: 1,
                    titulo: 'O jogo da imitação',
                    lancamento: 0,
                    classificacaoIndicativa: 12
                },    
                {
                    idFilme: 2,
                    titulo: 'A teoria de tudo',
                    lancamento: 0,
                    classificacaoIndicativa: 10
                },
                {
                    idFilme: 3,
                    titulo: 'Piratas do Caribe',
                    lancamento: 0,
                    classificacaoIndicativa: 14
                },
                {
                    idFilme: 4,
                    titulo: 'Não olhe para cima',
                    lancamento: 1,
                    classificacaoIndicativa: 18
                },
                {
                    idFilme: 5,
                    titulo: 'Vingança e Castigo',
                    lancamento: 0,
                    classificacaoIndicativa: 18
                },
                {
                    idFilme: 6,
                    titulo: 'O Esquadrão Suicida',
                    lancamento: 0,
                    classificacaoIndicativa: 16
                },            
                {
                    idFilme: 7,
                    titulo: 'Eternos',
                    lancamento: 1,
                    classificacaoIndicativa: 14
                },
                {
                    idFilme: 8,
                    titulo: 'Shang-Chi e a Lenda dos Dez Anéis',
                    lancamento: 1,
                    classificacaoIndicativa: 10
                },
                {
                    idFilme: 9,
                    titulo: 'Homem-Aranha: Sem Volta para Casa',
                    lancamento: 1,
                    classificacaoIndicativa: 12
                },
                {
                    idFilme: 10,
                    titulo: 'Uma mente brilhante',
                    lancamento: 0,
                    classificacaoIndicativa: 10
                },
            ]

            dispatch(setFilmes({ filmes, ultimoIdAdicionado: 10 }))
            dispatch(filmesCarregados(true))
        }, 2000)
    }
}

export const carregandoAdicionarFilme = () => {
    return {
        type: CARREGANDO_ADICIONAR_FILME
    }
}

export const adicionarFilmeCarregado = (sucesso) => {
    return {
        type: ADICIONAR_FILME_CARREGADO,
        payload: sucesso
    }
}

export const setMensagemAdicionarFilme = (mensagem) => {
    return {
        type: SET_MENSAGEM_ADICIONAR_FILME,
        payload: mensagem
    }
}

export const limpaAdicionarFilme = () => {
    return {
        type: LIMPA_ADICIONAR_FILME
    }
}

export const adicionaFilme = (novoFilme) => {
    return (dispatch, getState) => {
        dispatch(carregandoAdicionarFilme())

        let { ultimoIdAdicionado, filmes } = getState().filmes

        setTimeout(() => {

            let novoId = ultimoIdAdicionado + 1

            let filmeSalvar = {
                ...novoFilme,
                idFilme: novoId
            }

            filmes.push(filmeSalvar)

            dispatch(setFilmes({ filmes, ultimoIdAdicionado: novoId }))
            dispatch(adicionarFilmeCarregado(true))

        }, 2000)
    }
}

export const carregandoAlterarFilme = () => {
    return {
        type: CARREGANDO_ALTERAR_FILME
    }
}

export const alterarFilmeCarregado = (sucesso) => {
    return {
        type: ALTERAR_FILME_CARREGADO,
        payload: sucesso
    }
}

export const setMensagemAlterarFilme = (mensagem) => {
    return {
        type: SET_MENSAGEM_ALTERAR_FILME,
        payload: mensagem
    }
}

export const limpaAlterarFilme = () => {
    return {
        type: LIMPA_ALTERAR_FILME
    }
}

export const alterarFilme = (filmeAlterar) => {
    return (dispatch, getState) => {
        dispatch(carregandoAlterarFilme())

        let { filmes } = getState().filmes
        let indexFilme = null

        filmes.forEach((filme, index) => {
            if (filme.idFilme === filmeAlterar.idFilme) {
                indexFilme = index
            }
        })

        setTimeout(() => {
            if (indexFilme !== null) {

                filmes[indexFilme] = { ...filmes[indexFilme], ...filmeAlterar }

                dispatch(setFilmes({ filmes }))
                dispatch(alterarFilmeCarregado(true))
            } else {
                dispatch(alterarFilmeCarregado(false))
                notification.error({
                    message: 'Erro ao alterar filme',
                    description:
                        'Ocorreu um erro ao alterar o filme',
                    onClose: () => dispatch(limpaAlterarFilme())
                })
            }
        }, 2000)
    }
}

export const carregandoExcluirFilme = () => {
    return {
        type: CARREGANDO_EXCLUIR_FILME
    }
}

export const excluirFilmeCarregado = (sucesso) => {
    return {
        type: EXCLUIR_FILME_CARREGADO,
        payload: sucesso
    }
}

export const setMensagemExcluirFilme = (mensagem) => {
    return {
        type: SET_MENSAGEM_EXCLUIR_FILME,
        payload: mensagem
    }
}

export const limpaExcluirFilme = () => {
    return {
        type: LIMPA_EXCLUIR_FILME
    }
}

export const excluirFilme = (idExcluir) => {
    return (dispatch, getState) => {
        dispatch(carregandoExcluirFilme())

        let { filmes } = getState().filmes
        let indexFilme = null

        filmes.forEach((filme, index) => {
            if (filme.idFilme === idExcluir) {
                indexFilme = index
            }
        })

        setTimeout(() => {
            if (indexFilme !== null) {

                filmes.splice(indexFilme, 1)

                dispatch(setFilmes({ filmes }))
                dispatch(excluirFilmeCarregado(true))
                notification.success({
                    message: 'Filme excluído',
                    description:
                        'O filme foi excluido com sucesso',
                    onClose: () => dispatch(limpaExcluirFilme())
                })
            } else {
                dispatch(excluirFilmeCarregado(false))
                notification.error({
                    message: 'Erro ao excluir filme',
                    description:
                        'Ocorreu um erro ao excluir o filme',
                    onClose: () => dispatch(limpaExcluirFilme())
                })
            }
        }, 2000)
    }
}