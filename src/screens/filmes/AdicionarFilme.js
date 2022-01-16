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

    const [titulo, setTitulo] = useState('')
    const [classificacaoIndicativa, setClassificacaoIndicativa] = useState(null)
    const [lancamento, setLancamento] = useState('')

    const [erroTitulo, setErroTitulo] = useState('')
    const [erroClassificacao, setErroClassificacao] = useState('')

    useEffect(() => {
        mounted.current = true
        dispatch(limpaAdicionarFilme())

        return () => {
            mounted.current = false
        }
    }, [])

    const onChangeTitulo = (event) => {
        setTitulo(event.target.value)
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
            setErroTitulo('')
            setErroClassificacao('')
        }
    }

    const clicaEnviar = () => {
        limpaErros()

        let tituloOk = validarTituloFilme(titulo)
        let classificacaoOk = validarClassificacaoFilme(classificacaoIndicativa)

        if (tituloOk && classificacaoOk) {

            let dados = {
                classificacaoIndicativa: classificacaoIndicativa,
                titulo: titulo,
                lancamento: lancamento ? 1 : 0
            }

            dispatch(adicionaFilme(dados))
        } else {
            
            if (!tituloOk) {
                setErroTitulo('Campo necessário')
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
                <Form.Item name="titulo" id='titulo' label="Título" validateStatus={erroTitulo.length > 0 ? 'error' : ''} help={erroTitulo} rules={[{ required: true }]}>
                    <Input id='titulo-input' name='titulo-input' value={titulo} onChange={onChangeTitulo} />
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
                    <Checkbox value={lancamento} checked={lancamento} onChange={onChangeLancamento}>Lançamento</Checkbox>
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
                subTitle={`O filme "${titulo}" foi cadastrado com sucesso no sistema`}
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

export const validarTituloFilme = (titulo = '') => titulo.trim().length>=3
export const validarClassificacaoFilme = (classificacao) => classificacao !== null