import React, { useEffect, useRef, useState } from 'react'
import { Result, Form, Button, PageHeader, Divider, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import './AlterarLocacao.css'
import Loading from '../../common/Loading';
import { limpaAlterarLocacao, alterarLocacao } from '../../store/actions/locacoes';
import { validarClienteSelecionado, validarFilmeSelecionado } from './NovaLocacao';

const { Option } = Select

const routes = [
    {
        path: 'index',
        breadcrumbName: 'Locações',
    },
    {
        path: 'first',
        breadcrumbName: 'Alterar locação',
    }
]

export default function AlterarLocacao() {

    const mounted = useRef(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const locacoes = useSelector((state) => state.locacoes)
    const clientes = useSelector((state) => state.clientes)
    const filmes = useSelector((state) => state.filmes)
    const params = useParams()

    const [filmesDisponiveis, setFilmesDisponiveis] = useState([])

    const [idLocacaoG, setIdLocacaoG] = useState(null)
    const [clienteSelecionado, setClienteSelecionado] = useState(null)
    const [filmeSelecionado, setFilmeSelecionado] = useState(null)

    const [erroCliente, setErroCliente] = useState('')
    const [erroFilme, setErroFilme] = useState('')

    useEffect(() => {
        mounted.current = true
        dispatch(limpaAlterarLocacao())

        const { idLocacao } = params

        if (idLocacao) {
            let filtro = locacoes.locacoes.filter((locacao) => parseInt(locacao.idLocacao) === parseInt(idLocacao))

            if (filtro.length > 0) {
                let data = { ...filtro[0] }
                setClienteSelecionado(data.idCliente)
                setFilmeSelecionado(data.idFilme)
                setIdLocacaoG(parseInt(idLocacao))

                let filtroFilme = filmes.filmes.filter((filme) => filme.idFilme === data.idFilme)
                let filtroCliente = clientes.clientes.filter((cliente) => cliente.idCliente === data.idCliente)

                if(filtroFilme.length === 0){
                    message.error('O filme locado encontra-se indisponível no sistema')
                    navigate('/locacoes')
                }

                if(filtroCliente.length === 0){
                    message.error('O cliente encontra-se indisponível no sistema')
                    navigate('/locacoes')
                }

                let filmesIndisponiveis = []

                locacoes.locacoes.forEach((locacao) => {
                    if (locacao.dataDevolucao === null && data.idFilme !== locacao.idFilme) {
                        filmesIndisponiveis.push(locacao.idFilme)
                    }
                })

                let filmesSalvar = filmes.filmes.filter((filme) => !filmesIndisponiveis.includes(filme.idFilme))               


                setFilmesDisponiveis(Object.assign([], filmesSalvar))
            } else {
                message.error('Ocorreu um erro ao carregar a locação')
                navigate('/locacoes')
            }
        } else {
            message.error('Ocorreu um erro ao carregar a locação')
            navigate('/locacoes')
        }



        return () => {
            mounted.current = false
        }
    }, [])

    const onChangeFilme = (value) => {
        setFilmeSelecionado(value)
    }

    const onChangeCliente = (value) => {
        setClienteSelecionado(value)
    }

    const clicaVoltar = () => {
        navigate('/locacoes')
    }

    const limpaErros = () => {
        if (mounted.current) {
            setErroCliente('')
            setErroFilme('')
        }
    }

    const clicaEnviar = () => {
        limpaErros()

        let clienteOk = validarClienteSelecionado(clienteSelecionado)
        let filmeOk = validarFilmeSelecionado(filmeSelecionado)

        if (clienteOk && filmeOk) {

            let dados = {
                idLocacao: idLocacaoG,
                idFilme: filmeSelecionado,
                idCliente: clienteSelecionado
            }

            dispatch(alterarLocacao(dados))
        } else {

            if (!clienteOk) {
                setErroCliente('Campo necessário')
            }
            if (!filmeOk) {
                setErroFilme('Campo necessário')
            }

            setTimeout(() => {
                limpaErros()
            }, 3000)
        }
    }

    return (
        <div className='div-principal-alterar-locacao'>
            <PageHeader
                className="page-header"
                breadcrumb={{ routes }}
                title="Alterar locação"
            />
            <Divider style={{ marginTop: 0, paddingTop: 0, marginBottom: 40 }} />
            {!locacoes.sucessoAlterar &&
                <Form className='formulario-alterar-locacao' layout={'vertical'} name="formulario-locacao">
                    <Form.Item label="Cliente" validateStatus={erroCliente.length > 0 ? 'error' : ''} help={erroCliente} rules={[{ required: true }]}>
                        <Select
                            showSearch
                            placeholder="Buscar por nome"
                            optionFilterProp="children"
                            value={clienteSelecionado}
                            onChange={onChangeCliente}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            {clientes.clientes.map((cliente) => (
                                <Option value={cliente.idCliente} key={cliente.idCliente}>{cliente.nome}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Filme" validateStatus={erroFilme.length > 0 ? 'error' : ''} help={erroFilme} rules={[{ required: true }]}>
                        <Select
                            showSearch
                            placeholder="Buscar por nome"
                            optionFilterProp="children"
                            value={filmeSelecionado}
                            onChange={onChangeFilme}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            {filmesDisponiveis.map((filme) => (
                                <Option value={filme.idFilme} key={filme.idFilme}>{filme.nome}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" shape='round' onClick={clicaEnviar} className='botao-salvar-alterar-locacao'>
                            Salvar
                        </Button>
                        <Button htmlType="button" shape='round' onClick={clicaVoltar} className='botao-voltar-alterar-locacao'>
                            Cancelar
                        </Button>
                    </Form.Item>
                </Form>
            }
            {locacoes.sucessoAlterar && <Result
                status="success"
                title="Locação alterada!"
                subTitle={`A locação foi alterada com sucesso`}
                extra={[
                    <Button shape='round' key="botao-voltar-filmes" onClick={clicaVoltar}>
                        Voltar às locações
                    </Button>
                ]}
            />}
            {locacoes.carregandoAlterar && <Loading mensagem={'Alterando locação...'} />}
        </div>
    )
}