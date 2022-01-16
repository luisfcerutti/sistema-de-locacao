import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, Typography, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import './Login.css'
import { acessar } from '../../store/actions/usuario';
import Loading from '../../common/Loading';

const { Title } = Typography;

export default function Login() {

    const dispatch = useDispatch()
    const usuario = useSelector((state) => state.usuario)
    const mounted = useRef(false)

    const [usuarioAcesso, setUsuarioAcesso] = useState('')
    const [senha, setSenha] = useState('')

    const [erroUsuarioAcesso, setErroUsuarioAcesso] = useState('')
    const [erroSenha, setErroSenha] = useState('')

    useEffect(() => {
        mounted.current = true

        return () => {
            mounted.current = false
        }
    }, [])

    const onChangeUsuarioAcesso = (event) => {
        setUsuarioAcesso(event.target.value)
    }

    const onChangeSenha = (event) => {
        setSenha(event.target.value)
    }

    const limpaErros = () => {
        if(mounted.current){
            setErroUsuarioAcesso('')
            setErroSenha('')
        }
    }

    const clicaAcessar = () => {
        limpaErros()

        let usuarioOk = validarUsuario(usuarioAcesso)
        let senhaOk = validarSenha(senha)

        if(senhaOk && usuarioOk){
            dispatch(acessar({ usuario: usuarioAcesso, senha: senha }))
        }else{
            if(!senhaOk){
                setErroSenha('Senha curta')
            }
            if(!usuarioOk){
                setErroUsuarioAcesso('Insira um usuário válido')
            }

            setTimeout(() => {
                limpaErros()
            }, 3000)
        }
    }

    return (
        <div className='div-principal'>
            <div className='div-logo'>
                <Title level={3} className='title' style={{ color: 'black', textAlign: 'center' }}>Sistema Locação</Title>
            </div>
            <div className='div-form'>
                <Title level={5} style={{ color: 'black', textAlign: 'center' }}>Acessar</Title>
                <Form className='formulario' layout={'vertical'} name="formulario-acesso">
                    <Form.Item name="usuarioAcesso" id='usuarioAcesso' label="Usuário" validateStatus={erroUsuarioAcesso.length > 0 ? 'error' : ''} help={erroUsuarioAcesso} rules={[{ required: true }]}>
                        <Input id='usuario-input' name='usuario-input' value={usuarioAcesso} onChange={onChangeUsuarioAcesso} />
                    </Form.Item>
                    <Form.Item name="senha" id='senha' label="Senha" validateStatus={erroSenha.length > 0 ? 'error' : ''} help={erroSenha} rules={[{ required: true }]}>
                        <Input.Password id='senha-input' name='senha-input' value={senha} onChange={onChangeSenha} />
                    </Form.Item>                    
                    <Form.Item wrapperCol={{ offset: 7 }}>
                        <Button type="primary" shape='round' size='large' onClick={clicaAcessar} className='botao-acessar'>
                            Acessar
                        </Button>                       
                    </Form.Item>
                </Form>
            </div>
            {usuario.carregando && <Loading mensagem={'Realizando acesso...'}/>}
        </div>
    )
}

export const validarUsuario = (dados = "") => dados.trim().length>=5
export const validarSenha = (dados = "") => dados.trim().length>=6
