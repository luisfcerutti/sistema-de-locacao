import React, { useEffect, useRef, useState } from 'react'
import { Result, Form, Input, Button, PageHeader, Divider, Select, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { adicionaFilme, limpaAdicionarFilme } from '../../store/actions/filmes';
import './AdicionarFilme.css'
import Loading from '../../common/Loading';
import { opcoesClassificacao } from '../../utils/constantes';

const { Option } = Select

const routes = [
    {
        path: 'index',
        breadcrumbName: 'Filmes',
    },
    {
        path: 'first',
        breadcrumbName: 'Adicionar filme',
    }
]

export default function AdicionarFilme() {

    const mounted = useRef(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const filmes = useSelector((state) => state.filmes)

    const [nome, setNome] = useState('')
    const [classificacaoIndicativa, setClassificacaoIndicativa] = useState(null)
    const [lancamento, setLancamento] = useState('')

    const [erroNome, setErroNome] = useState('')
    const [erroClassificacao, setErroClassificacao] = useState('')

    useEffect(() => {
        mounted.current = true
        dispatch(limpaAdicionarFilme())

        return () => {
            mounted.current = false
        }
    }, [])

    const onChangeNome = (event) => {
        setNome(event.target.value)
    }

    const onChangeLancamento = (event) => {
        setLancamento(event.target.checked)
    }
    
    const onChangeClassificacaoIndicativa = (value) => {
        setClassificacaoIndicativa(value)
    }

    const clicaVoltar = () => {
        navigate('/filmes')
    }

    const limpaErros = () => {
        if (mounted.current) {
            setErroNome('')
            setErroClassificacao('')
        }
    }

    const clicaEnviar = () => {
        limpaErros()

        let nomeOk = validarNomeFilme(nome)
        let classificacaoOk = validarClassificacaoFilme(classificacaoIndicativa)

        if (nomeOk && classificacaoOk) {

            let dados = {
                classificacaoIndicativa: classificacaoIndicativa,
                nome: nome,
                lancamento: lancamento ? 1 : 0
            }

            dispatch(adicionaFilme(dados))
        } else {
            
            if (!nomeOk) {
                setErroNome('Campo necessário')
            }
            if (!classificacaoOk) {
                setErroClassificacao('Campo necessário')
            }

            setTimeout(() => {
                limpaErros()
            }, 3000)
        }
    }

    return (
        <div className='div-principal-add-filme'>
            <PageHeader
                className="page-header"
                breadcrumb={{ routes }}
                title="Adicionar filme"
            />
            <Divider style={{ marginTop: 0, paddingTop: 0, marginBottom: 40 }} />
            {!filmes.sucessoAdicionar && <Form className='formulario-add-filme' layout={'vertical'} name="formulario-filme">
                <Form.Item name="nome" id='nome' label="Nome" validateStatus={erroNome.length > 0 ? 'error' : ''} help={erroNome} rules={[{ required: true }]}>
                    <Input id='nome-input' name='nome-input' value={nome} onChange={onChangeNome} />
                </Form.Item>
                <Form.Item name="classificacaoIndicativa" id='classificacaoIndicativa' label="Classificação indicativa" validateStatus={erroClassificacao.length > 0 ? 'error' : ''}
                    help={erroClassificacao} rules={[{ required: true }]}>
                    <Select value={classificacaoIndicativa} onChange={onChangeClassificacaoIndicativa}>
                        {opcoesClassificacao.map((op) => (
                            <Option key={op.value} value={op.value}>{op.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="lancamento" >
                    <Checkbox value={lancamento} onChange={onChangeLancamento}>Lançamento</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" shape='round' onClick={clicaEnviar} className='botao-adicionar-add-filme'>
                        Adicionar
                    </Button>
                    <Button htmlType="button" shape='round' onClick={clicaVoltar} className='botao-voltar-add-filme'>
                        Cancelar
                    </Button>
                </Form.Item>
            </Form>}
            {filmes.sucessoAdicionar && <Result
                status="success"
                title="Filme cadastrado!"
                subTitle={`O filme "${nome}" foi cadastrado com sucesso no sistema`}
                extra={[
                    <Button shape='round' key="botao-voltar-filmes" onClick={clicaVoltar}>
                        Voltar aos filmes
                    </Button>
                ]}
            />}
            {filmes.carregandoAdicionar && <Loading mensagem={'Adicionando filme...'} />}
        </div>
    )
}

export const validarNomeFilme = (nome = '') => nome.trim().length>=3
export const validarClassificacaoFilme = (classificacao) => classificacao !== null