import React, { useEffect, useRef, useState } from 'react'
import { Result, Form, DatePicker, Input, Button, PageHeader, Divider, message } from 'antd';
import MaskedInput from 'antd-mask-input'
import ptBR from 'antd/lib/locale/pt_BR';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { alterarCliente, limpaAlterarCliente } from '../../store/actions/clientes';
import './AlterarCliente.css'
import Loading from '../../common/Loading';
import moment from 'moment';
import { formataCpf } from '../../utils/formatadores';
import { validarDataNascimento, validarNomeCompleto } from './AdicionarCliente';

const routes = [
    {
        path: 'index',
        breadcrumbName: 'Clientes',
    },
    {
        path: 'first',
        breadcrumbName: 'Alterar cliente',
    }
]

export default function AlterarCliente() {

    const mounted = useRef(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const clientes = useSelector((state) => state.clientes)
    const params = useParams()

    const [idClienteG, setIdClienteG] = useState(null)
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState(null)

    const [erroNome, setErroNome] = useState('')
    const [erroNascimento, setErroNascimento] = useState('')

    useEffect(() => {
        mounted.current = true
        dispatch(limpaAlterarCliente())

        const { idCliente } = params

        if(idCliente){
            let filtro = clientes.clientes.filter((cliente) => parseInt(cliente.idCliente) === parseInt(idCliente))

            if(filtro.length>0){
                let data = { ...filtro[0] }
                setCpf(formataCpf(data.cpf))
                setDataNascimento(moment(data.dataNascimento))
                setNome(data.nome)
                setIdClienteG(parseInt(idCliente))
            }else{
                message.error('Ocorreu um erro ao carregar o cliente')
                navigate('/clientes')
            }
        }else{
            message.error('Ocorreu um erro ao carregar o cliente')
            navigate('/clientes')
        }

        return () => {
            mounted.current = false
        }
    }, [])

    const onChangeNome = (event) => {
        setNome(event.target.value)
    }

    const onChangeDataNascimento = (value) => {
        setDataNascimento(value)
    }

    const clicaVoltar = () => {
        navigate('/clientes')
    }

    const limpaErros = () => {
        if (mounted.current) {
            setErroNascimento('')
            setErroNome('')
        }
    }

    const clicaEnviar = () => {
        limpaErros()

        let nomeOk = validarNomeCompleto(nome)
        let nascimentoOk = validarDataNascimento(dataNascimento)

        if (nomeOk && nascimentoOk) {
            let dataNascimentoFinal = dataNascimento.toDate()

            let dados = {
                idCliente: idClienteG,
                nome: nome,
                dataNascimento: dataNascimentoFinal
            }

            dispatch(alterarCliente(dados))
        } else {
           
            if (!nomeOk) {
                setErroNome('Deve ser o nome completo')
            }
            if (!nascimentoOk) {
                setErroNascimento('Idade mínima de 12 anos')
            }

            setTimeout(() => {
                limpaErros()
            }, 3000)
        }
    }

    return (
        <div className='div-principal-alterar-cliente'>
            <PageHeader
                className="page-header"
                breadcrumb={{ routes }}
                title="Alterar cliente"
            />
            <Divider style={{ marginTop: 0, paddingTop: 0, marginBottom: 40 }} />
            {!clientes.sucessoAlterar && <Form className='formulario-alterar-cliente' layout={'vertical'} name="formulario-cliente">
                <Form.Item label="Nome" validateStatus={erroNome.length > 0 ? 'error' : ''} help={erroNome}>
                    <Input id='nome-input' name='nome-input' value={nome} onChange={onChangeNome} />
                </Form.Item>
                <Form.Item label="CPF">
                    <MaskedInput disabled value={cpf} id='cpf-input' name='cpf-input' mask={'111.111.111-11'} />
                </Form.Item>
                <Form.Item validateStatus={erroNascimento.length > 0 ? 'error' : ''} help={erroNascimento} label="Data de nascimento">
                    <DatePicker defaultValue={moment().subtract(12, 'years')} disabledDate={d => !d || d.isAfter(moment().subtract(12, 'years')) || d.isSameOrBefore("1960-01-01") } placeholder={'Selecionar data'} onChange={onChangeDataNascimento} value={dataNascimento} locale={ptBR} style={{ width: '100%' }} format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item style={{}}>
                    <Button type="primary" shape='round' onClick={clicaEnviar} className='botao-salvar-alterar-cliente'>
                        Salvar
                    </Button>
                    <Button htmlType="button" shape='round' onClick={clicaVoltar} className='botao-voltar-alterar-cliente'>
                        Cancelar
                    </Button>
                </Form.Item>
            </Form>}
            {clientes.sucessoAlterar && <Result
                status="success"
                title="Cliente alterado!"
                subTitle={`O cliente "${nome}" foi alterado com sucesso`}
                extra={[
                    <Button shape='round' key="botao-voltar-clientes" onClick={clicaVoltar}>
                        Voltar aos clientes
                    </Button>
                ]}
            />}
            {clientes.carregandoAlterar && <Loading mensagem={'Alterando cliente...'} />}
        </div>
    )
}