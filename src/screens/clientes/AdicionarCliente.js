import React, { useEffect, useRef, useState } from 'react'
import { Result, Form, DatePicker, Input, Button, PageHeader, Divider } from 'antd';
import MaskedInput from 'antd-mask-input'
import ptBR from 'antd/lib/locale/pt_BR';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { adicionaCliente, limpaAdicionarCliente } from '../../store/actions/clientes';
import './AdicionarCliente.css'
import Loading from '../../common/Loading';
import moment from 'moment';

const routes = [
    {
        path: 'index',
        breadcrumbName: 'Clientes',
    },
    {
        path: 'first',
        breadcrumbName: 'Adicionar cliente',
    }
]

export default function AdicionarCliente() {

    const mounted = useRef(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const clientes = useSelector((state) => state.clientes)

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState(null)

    const [erroNome, setErroNome] = useState('')
    const [erroCpf, setErroCpf] = useState('')
    const [erroNascimento, setErroNascimento] = useState('')

    useEffect(() => {
        mounted.current = true
        dispatch(limpaAdicionarCliente())

        return () => {
            mounted.current = false
        }
    }, [])

    const onChangeNome = (event) => {
        setNome(event.target.value)
    }

    const onChangeCpf = (event) => {
        setCpf(event.target.value)
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
            setErroCpf('')
        }
    }

    const clicaEnviar = () => {
        limpaErros()

        let cpfOk = validarCPF(cpf)
        let nomeOk = validarNomeCompleto(nome)
        let nascimentoOk = validarDataNascimento(dataNascimento)

        if (cpfOk && nomeOk && nascimentoOk) {
            let cpfFinal = cpf.replace('.', '').replace('.', '').replace('-', '')
            let dataNascimentoFinal = dataNascimento.toDate()

            let dados = {
                cpf: cpfFinal,
                nome: nome.length<=200 ? nome : nome.slice(0, 200),
                dataNascimento: dataNascimentoFinal
            }

            dispatch(adicionaCliente(dados))
        } else {
            if (!cpfOk) {
                setErroCpf('Insira um CPF válido')
            }
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
        <div className='div-principal-add-cliente'>
            <PageHeader
                className="page-header"
                breadcrumb={{ routes }}
                title="Adicionar cliente"
            />
            <Divider style={{ marginTop: 0, paddingTop: 0, marginBottom: 40 }} />
            {!clientes.sucessoAdicionar && <Form className='formulario-add-cliente' layout={'vertical'} name="formulario-cliente">
                <Form.Item name="nome" id='nome' label="Nome" validateStatus={erroNome.length > 0 ? 'error' : ''} help={erroNome} rules={[{ required: true }]}>
                    <Input id='nome-input' name='nome-input' value={nome} onChange={onChangeNome} />
                </Form.Item>
                <Form.Item name="cpf" id='cpf' label="CPF" validateStatus={(erroCpf.length > 0 || clientes.mensagemAdicionar.tipo === 'erro-cpf') ? 'error' : ''}
                    help={(clientes.mensagemAdicionar.tipo === 'erro-cpf' ? clientes.mensagemAdicionar.mensagem : erroCpf)} rules={[{ required: true }]}>
                    <MaskedInput value={cpf} onChange={onChangeCpf} id='cpf-input' name='cpf-input' mask={'111.111.111-11'} />
                </Form.Item>
                <Form.Item name="dataNascimento" id='dataNascimento' validateStatus={erroNascimento.length > 0 ? 'error' : ''} help={erroNascimento} label="Data de nascimento"
                    rules={[{ required: true }]}>
                    <DatePicker defaultValue={moment().subtract(12, 'years')} disabledDate={d => !d || d.isAfter(moment().subtract(12, 'years')) || d.isSameOrBefore("1960-01-01")} placeholder={'Selecionar data'} onChange={onChangeDataNascimento} value={dataNascimento} locale={ptBR} style={{ width: '100%' }} format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item style={{}}>
                    <Button type="primary" shape='round' onClick={clicaEnviar} className='botao-adicionar-add-cliente'>
                        Adicionar
                    </Button>
                    <Button htmlType="button" shape='round' onClick={clicaVoltar} className='botao-voltar-add-cliente'>
                        Cancelar
                    </Button>
                </Form.Item>
            </Form>}
            {clientes.sucessoAdicionar && <Result
                status="success"
                title="Cliente cadastrado!"
                subTitle={`O cliente "${nome}" foi cadastrado com sucesso no sistema`}
                extra={[
                    <Button shape='round' key="botao-voltar-clientes" onClick={clicaVoltar}>
                        Voltar aos clientes
                    </Button>
                ]}
            />}
            {clientes.carregandoAdicionar && <Loading mensagem={'Adicionando cliente...'} />}
        </div>
    )
}

export const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false;
    if (cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999")
        return false;
    let add = 0;
    let rev
    for (let i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (let i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpf.charAt(10)))
        return false;
    return true;

}

export const validarDataNascimento = (data) => {
    if(data){
        let hoje = moment()
        let momentData = moment(data)
        let diferenca = hoje.diff(momentData, 'years')
        return diferenca >= 12
    }else{
        return false
    }
}

export const validarNomeCompleto = (nome = '') => /^(\w.+\s).+$/.test(nome)