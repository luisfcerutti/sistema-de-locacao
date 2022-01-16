import React, { useEffect, useRef, useState } from 'react'
import { Result, Form, Input, Button, PageHeader, Divider, Select, Checkbox, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { alterarFilme, limpaAlterarFilme } from '../../store/actions/filmes';
import './AlterarFilme.css'
import Loading from '../../common/Loading';
import { opcoesClassificacao } from '../../utils/constantes';
import { validarClassificacaoFilme, validarNomeFilme } from './AdicionarFilme';

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

export default function AlterarFilme() {

    const mounted = useRef(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const filmes = useSelector((state) => state.filmes)
    const params = useParams()

    const [idFilmeG, setIdFilmeG] = useState(null)
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [classificacaoIndicativa, setClassificacaoIndicativa] = useState(null)
    const [lancamento, setLancamento] = useState('')

    const [erroNome, setErroNome] = useState('')
    const [erroClassificacao, setErroClassificacao] = useState('')

    useEffect(() => {
        mounted.current = true
        dispatch(limpaAlterarFilme())

        const { idFilme } = params

        if(idFilme){
            let filtro = filmes.filmes.filter((filme) => parseInt(filme.idFilme) === parseInt(idFilme))

            if(filtro.length>0){
                let data = { ...filtro[0] }
                setNome(data.nome)
                setClassificacaoIndicativa(data.classificacaoIndicativa)
                setLancamento((data.lancamento === 1))
                setIdFilmeG(parseInt(idFilme))
            }else{
                message.error('Ocorreu um erro ao carregar o filme')
                navigate('/filmes')
            }
        }else{
            message.error('Ocorreu um erro ao carregar o filme')
            navigate('/filmes')
        }

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
                idFilme: idFilmeG,
                classificacaoIndicativa: classificacaoIndicativa,
                nome: nome,
                lancamento: lancamento ? 1 : 0
            }

            dispatch(alterarFilme(dados))
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
        <div className='div-principal-alterar-filme'>
            <PageHeader
                className="page-header"
                breadcrumb={{ routes }}
                title="Alterar filme"
            />
            <Divider style={{ marginTop: 0, paddingTop: 0, marginBottom: 40 }} />
            {!filmes.sucessoAlterar && <Form className='formulario-alterar-filme' layout={'vertical'} name="formulario-filme">
                <Form.Item id='nome' label="Nome" validateStatus={erroNome.length > 0 ? 'error' : ''} help={erroNome} rules={[{ required: true }]}>
                    <Input id='nome-input' name='nome-input' value={nome} onChange={onChangeNome} />
                </Form.Item>
                <Form.Item id='classificacaoIndicativa' label="Classificação indicativa" validateStatus={erroClassificacao.length > 0 ? 'error' : ''}
                    help={erroClassificacao} rules={[{ required: true }]}>
                    <Select id='select-classificacao' name='select-classificacao' value={classificacaoIndicativa} onChange={onChangeClassificacaoIndicativa}>
                        {opcoesClassificacao.map((op) => (
                            <Option key={op.value} value={op.value}>{op.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Checkbox checked={lancamento} value={lancamento} onChange={onChangeLancamento}>Lançamento</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" shape='round' onClick={clicaEnviar} className='botao-salvar-alterar-filme'>
                        Salvar
                    </Button>
                    <Button htmlType="button" shape='round' onClick={clicaVoltar} className='botao-voltar-alterar-filme'>
                        Cancelar
                    </Button>
                </Form.Item>
            </Form>}
            {filmes.sucessoAlterar && <Result
                status="success"
                title="Filme alterado!"
                subTitle={`O filme "${nome}" foi alterado com sucesso`}
                extra={[
                    <Button shape='round' key="botao-voltar-filmes" onClick={clicaVoltar}>
                        Voltar aos filmes
                    </Button>
                ]}
            />}
            {filmes.carregandoAlterar && <Loading mensagem={'Alterando filme...'} />}
        </div>
    )
}