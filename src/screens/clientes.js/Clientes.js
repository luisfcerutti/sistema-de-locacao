import React from 'react'
import { Result, Button, PageHeader, Divider, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './Clientes.css'
import TabelaClientes from './TabelaClientes';
import { excluirCliente, sincronizarClientes } from '../../store/actions/clientes';
import Loading from '../../common/Loading';

const { confirm } = Modal

export default function Clientes() {

    const clientes = useSelector((state) => state.clientes)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const navegarAdicionarCliente = () => {
        navigate('/clientes/adicionar-cliente')
    }

    const sincronizaClientes = () => {
        dispatch(sincronizarClientes())
    }

    const confirmaExcluir = (cliente) => {
        if(cliente){
            dispatch(excluirCliente(cliente))
        }
    }

    const clicaExcluirCliente = (cliente) => {
        
        confirm({
            title: 'Deseja prosseguir com a exclusão?',
            icon: <ExclamationCircleOutlined />,
            content: `O cliente "${cliente.nome}" será excluído do sistema de maneira definitiva`,
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                confirmaExcluir(cliente.idCliente);
            }
        });
    }

    return (
        <div className='div-principal-clientes'>
            <PageHeader
                className="page-header"
                title="Clientes"
                extra={[
                    <Button onClick={navegarAdicionarCliente} shape='round' name='botao-adicionar-cliente' key="botao-adicionar-cliente">Adicionar cliente</Button>,
                ]}
            />
            <Divider style={{ marginTop: 10, paddingTop: 0, marginBottom: 30 }} />
            {clientes.sincronizado && <TabelaClientes clicaExcluirCliente={clicaExcluirCliente}/>}
            {!clientes.sincronizado && <Result
                status="warning"
                title="Ops!"
                subTitle={"Ocorreu um erro ao sincronizar os clientes"}
                extra={
                    <Button shape='round' key="botao-sincronizar-clientes" onClick={sincronizaClientes}>
                        Tentar novamente
                    </Button>
                }
            />}
            {clientes.carregandoExcluir && <Loading mensagem={'Excluindo cliente...'} />}
            {clientes.carregando && <Loading mensagem={'Carregando clientes...'} />}
        </div>
    )
}