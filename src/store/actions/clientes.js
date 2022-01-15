import { ADICIONAR_CLIENTE_CARREGADO, ALTERAR_CLIENTE_CARREGADO, CARREGANDO_ADICIONAR_CLIENTE, CARREGANDO_ALTERAR_CLIENTE, CARREGANDO_CLIENTES, CARREGANDO_EXCLUIR_CLIENTE, CLIENTES_CARREGADOS, EXCLUIR_CLIENTE_CARREGADO, LIMPA_ADICIONAR_CLIENTE, LIMPA_ALTERAR_CLIENTE, LIMPA_CLIENTES, LIMPA_EXCLUIR_CLIENTE, SET_CLIENTES, SET_MENSAGEM_ADICIONAR_CLIENTE, SET_MENSAGEM_ALTERAR_CLIENTE, SET_MENSAGEM_EXCLUIR_CLIENTE } from "./actionTypes"

import moment from 'moment'
import { notification } from 'antd';

export const carregandoClientes = () => {
    return {
        type: CARREGANDO_CLIENTES
    }
}

export const clientesCarregados = (sincronizado) => {
    return {
        type: CLIENTES_CARREGADOS,
        payload: sincronizado
    }
}

export const setClientes = (dados) => {
    return {
        type: SET_CLIENTES,
        payload: dados
    }
}

export const limpaClientes = () => {
    return {
        type: LIMPA_CLIENTES
    }
}

export const sincronizarClientes = () => {
    return dispatch => {
        dispatch(carregandoClientes())

        setTimeout(() => {

            let clientes = [
                {
                    idCliente: 1,
                    nome: 'Samuel Otávio Araújo',
                    cpf: '91558203010',
                    dataNascimento: moment({ day: 18, month: 11, year: 2007 }).toDate()
                },
                {
                    idCliente: 2,
                    nome: 'Raimundo César Moreira',
                    cpf: '68659538005',
                    dataNascimento: moment({ day: 11, month: 8, year: 1999 }).toDate()
                },
                {
                    idCliente: 3,
                    nome: 'Vitor Matheus da Luz',
                    cpf: '22029344052',
                    dataNascimento: moment({ day: 25, month: 7, year: 1980 }).toDate()
                },
                {
                    idCliente: 4,
                    nome: 'Carla Teresinha Vitória Gonçalves',
                    cpf: '54295769215',
                    dataNascimento: moment({ day: 10, month: 0, year: 2007 }).toDate()
                },
                {
                    idCliente: 5,
                    nome: 'Hugo César Rodrigues',
                    cpf: '10835062422',
                    dataNascimento: moment({ day: 15, month: 1, year: 2002 }).toDate()
                },
                {
                    idCliente: 6,
                    nome: 'Sophia Sebastiana Manuela Oliveira',
                    cpf: '36399586836',
                    dataNascimento: moment({ day: 4, month: 6, year: 2003 }).toDate()
                },
                {
                    idCliente: 7,
                    nome: 'Lucas Tiago Anderson Viana',
                    cpf: '06933225607',
                    dataNascimento: moment({ day: 30, month: 7, year: 1970 }).toDate()
                },
                {
                    idCliente: 8,
                    nome: 'Emanuelly Jéssica',
                    cpf: '63327275866',
                    dataNascimento: moment({ day: 13, month: 3, year: 1998 }).toDate()
                },
                {
                    idCliente: 9,
                    nome: 'Cauã Rodrigo Luiz Viana',
                    cpf: '19914541127',
                    dataNascimento: moment({ day: 22, month: 2, year: 1975 }).toDate()
                },
                {
                    idCliente: 10,
                    nome: 'José Silva Olveira',
                    cpf: '77995677243',
                    dataNascimento: moment({ day: 10, month: 11, year: 2000 }).toDate()
                }
            ]

            dispatch(setClientes({ clientes, ultimoIdAdicionado: 10 }))
            dispatch(clientesCarregados(true))
        }, 2000)
    }
}

export const carregandoAdicionarCliente = () => {
    return {
        type: CARREGANDO_ADICIONAR_CLIENTE
    }
}

export const adicionarClienteCarregado = (sucesso) => {
    return {
        type: ADICIONAR_CLIENTE_CARREGADO,
        payload: sucesso
    }
}

export const setMensagemAdicionarCliente = (mensagem) => {
    return {
        type: SET_MENSAGEM_ADICIONAR_CLIENTE,
        payload: mensagem
    }
}

export const limpaAdicionarCliente = () => {
    return {
        type: LIMPA_ADICIONAR_CLIENTE
    }
}

export const adicionaCliente = (novoCliente) => {
    return (dispatch, getState) => {
        dispatch(carregandoAdicionarCliente())

        let { ultimoIdAdicionado, clientes } = getState().clientes

        setTimeout(() => {

            let filtroCpf = clientes.filter((cliente) => cliente.cpf === novoCliente.cpf)

            if (filtroCpf.length === 0) {
                let novoId = ultimoIdAdicionado + 1

                let clienteSalvar = {
                    ...novoCliente,
                    id: novoId
                }

                clientes.push(clienteSalvar)

                dispatch(setClientes({ clientes, ultimoIdAdicionado: novoId }))
                dispatch(adicionarClienteCarregado(true))
            } else {
                dispatch(adicionarClienteCarregado(false))        
                dispatch(setMensagemAdicionarCliente({ tipo: 'erro-cpf', mensagem: 'CPF já cadastrado' }))
                setTimeout(() => {
                    dispatch(limpaAdicionarCliente())
                }, 3000)
            }

        }, 2000)
    }
}

export const carregandoAlterarCliente = () => {
    return {
        type: CARREGANDO_ALTERAR_CLIENTE
    }
}

export const alterarClienteCarregado = (sucesso) => {
    return {
        type: ALTERAR_CLIENTE_CARREGADO,
        payload: sucesso
    }
}

export const setMensagemAlterarCliente = (mensagem) => {
    return {
        type: SET_MENSAGEM_ALTERAR_CLIENTE,
        payload: mensagem
    }
}

export const limpaAlterarCliente = () => {
    return {
        type: LIMPA_ALTERAR_CLIENTE
    }
}

export const alterarCliente = (clienteAlterar) => {
    return (dispatch, getState) => {
        dispatch(carregandoAlterarCliente())

        let { clientes } = getState().clientes
        let indexCliente = null

        clientes.forEach((cliente, index) => {
            if (cliente.idCliente === clienteAlterar.idCliente) {
                indexCliente = index
            }
        })

        setTimeout(() => {
            if (indexCliente !== null) {

                clientes[indexCliente] = { ...clientes[indexCliente], ...clienteAlterar }

                dispatch(setClientes({ clientes }))
                dispatch(alterarClienteCarregado(true))
            } else {
                dispatch(alterarClienteCarregado(false))
                notification.error({
                    message: 'Erro ao alterar cliente',
                    description:
                        'Ocorreu um erro ao alterar o cliente',
                    onClose: () => dispatch(limpaAlterarCliente())
                }) 
            }
        }, 2000)
    }
}

export const carregandoExcluirCliente = () => {
    return {
        type: CARREGANDO_EXCLUIR_CLIENTE
    }
}

export const excluirClienteCarregado = (sucesso) => {
    return {
        type: EXCLUIR_CLIENTE_CARREGADO,
        payload: sucesso
    }
}

export const setMensagemExcluirCliente = (mensagem) => {
    return {
        type: SET_MENSAGEM_EXCLUIR_CLIENTE,
        payload: mensagem
    }
}

export const limpaExcluirCliente = () => {
    return {
        type: LIMPA_EXCLUIR_CLIENTE
    }
}

export const excluirCliente = (idExcluir) => {
    return (dispatch, getState) => {
        dispatch(carregandoExcluirCliente())

        let { clientes } = getState().clientes
        let indexCliente = null

        clientes.forEach((cliente, index) => {
            if (cliente.idCliente === idExcluir) {
                indexCliente = index
            }
        })

        setTimeout(() => {
            if (indexCliente !== null) {

                clientes.splice(indexCliente, 1)

                dispatch(setClientes({ clientes }))
                dispatch(excluirClienteCarregado(true))
                notification.success({
                    message: 'Cliente excluído',
                    description:
                        'O cliente foi excluido com sucesso',
                    onClose: () => dispatch(limpaExcluirCliente())
                })  
            } else {
                dispatch(excluirClienteCarregado(false))
                notification.error({
                    message: 'Erro ao excluir cliente',
                    description:
                        'Ocorreu um erro ao excluir o cliente',
                    onClose: () => dispatch(limpaExcluirCliente())
                })                
            }
        }, 2000)
    }
}