import React, { useEffect, useRef, useState } from 'react'
import { Result, Form, Button, PageHeader, Divider, Select, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import './NovaLocacao.css'
import Loading from '../../common/Loading';
import { limpaAdicionarLocacao, adicionaLocacao } from '../../store/actions/locacoes';
import { formataData } from '../../utils/formatadores';

const { Option } = Select

const routes = [
    {
        path: 'index',
        breadcrumbName: 'Locações',
    },
    {
        path: 'first',
        breadcrumbName: 'Nova locação',
    }
]

export default function NovaLocacao() {

    const mounted = useRef(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const locacoes = useSelector((state) => state.locacoes)
    const clientes = useSelector((state) => state.clientes)
    const filmes = useSelector((state) => state.filmes)

    const [filmesDisponiveis, setFilmesDisponiveis] = useState([])

    const [clienteSelecionado, setClienteSelecionado] = useState(null)
    const [filmeSelecionado, setFilmeSelecionado] = useState(null)

    const [erroCliente, setErroCliente] = useState('')
    const [erroFilme, setErroFilme] = useState('')

    useEffect(() => {
        mounted.current = true

        dispatch(limpaAdicionarLocacao())

        let filmesIndisponiveis = []

        locacoes.locacoes.forEach((locacao) => {
            if (locacao.dataDevolucao === null) {
                filmesIndisponiveis.push(locacao.idFilme)
            }
        })

        let filmesSalvar = filmes.filmes.filter((filme) => !filmesIndisponiveis.includes(filme.idFilme))

        setFilmesDisponiveis(Object.assign([], filmesSalvar))

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
                idFilme: filmeSelecionado,
                idCliente: clienteSelecionado,
                dataLocacao: new Date(),
                dataDevolucao: null
            }

            dispatch(adicionaLocacao(dados))
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
        <div className='div-principal-nova-locacao'>
            <PageHeader
                className="page-header"
                breadcrumb={{ routes }}
                title="Nova locação"
            />
            <Divider style={{ marginTop: 0, paddingTop: 0, marginBottom: 40 }} />
            {!locacoes.sucessoAdicionar &&
                <Form className='formulario-nova-locacao' layout={'vertical'} name="formulario-locacao">
                    <Form.Item name="clienteSelecionado" id='clienteSelecionado' label="Cliente" validateStatus={erroCliente.length > 0 ? 'error' : ''} help={erroCliente} rules={[{ required: true }]}>
                        <Select
                            showSearch
                            placeholder="Buscar por nome"
                            optionFilterProp="children"
                            value={clienteSelecionado}
                            onChange={onChangeCliente}
                            notFoundContent={<p>Nenhum cliente encontrado</p>}
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
                    <Form.Item name="filmeSelecionado" id='filmeSelecionado' label="Filme" validateStatus={erroFilme.length > 0 ? 'error' : ''} help={erroFilme} rules={[{ required: true }]}>
                        <Select
                            showSearch
                            placeholder="Buscar por título"
                            optionFilterProp="children"
                            value={filmeSelecionado}
                            onChange={onChangeFilme}
                            notFoundContent={<p>Nenhum filme encontrado</p>}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            {filmesDisponiveis.map((filme) => (
                                <Option value={filme.idFilme} key={filme.idFilme}>{filme.titulo}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Alert message={`A previsão de devolução do filme é em ${formataData(moment().add('2', 'days').toDate())}`} type="info" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" shape='round' onClick={clicaEnviar} className='botao-adicionar-nova-locacao'>
                            Adicionar
                        </Button>
                        <Button htmlType="button" shape='round' onClick={clicaVoltar} className='botao-voltar-nova-locacao'>
                            Cancelar
                        </Button>
                    </Form.Item>
                </Form>
            }
            {locacoes.sucessoAdicionar && <Result
                status="success"
                title="Locação cadastrada!"
                subTitle={`A locação foi cadastrada com sucesso no sistema`}
                extra={[
                    <Button shape='round' key="botao-voltar-locacoes" onClick={clicaVoltar}>
                        Voltar às locações
                    </Button>
                ]}
            />}
            {locacoes.carregandoAdicionar && <Loading mensagem={'Adicionando locação...'} />}
        </div>
    )
}

export const validarClienteSelecionado = (cliente) => cliente !== null
export const validarFilmeSelecionado = (filme) => filme !== null