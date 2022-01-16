import React from 'react'
import { Result, Button, PageHeader, Divider, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Locacoes.css'
import TabelaLocacoes from './TabelaLocacoes';
import { alterarLocacao, excluirLocacao, sincronizarLocacoes } from '../../store/actions/locacoes';
import Loading from '../../common/Loading';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal

export default function Locacoes() {

    const locacoes = useSelector((state) => state.locacoes)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const navegarNovaLocacao = () => {
        navigate('/locacoes/nova-locacao')
    }

    const sincronizaLocacoes = () => {
        dispatch(sincronizarLocacoes())
    }

    const confirmaExcluir = (locacao) => {
        if(locacao){
            dispatch(excluirLocacao(locacao))
        }
    }

    const confirmaDevolucao = (locacao) => {
        if(locacao){
            dispatch(alterarLocacao({ idLocacao: locacao, dataDevolucao: new Date() }))
        }
    }

    const clicaConfirmarDevolucao = (locacao) => {        
        confirm({
            title: 'Deseja confirmar a devolução?',
            icon: <ExclamationCircleOutlined />,
            content: `Confirmar devolução do filme "${locacao.nomeFilme}" para hoje`,
            okText: 'Confirmar',
            cancelText: 'Cancelar',
            onOk() {
                confirmaDevolucao(locacao.idLocacao);
            }
        });
    }

    const clicaExcluirLocacao = (locacao) => {        
        confirm({
            title: 'Deseja prosseguir com a exclusão?',
            icon: <ExclamationCircleOutlined />,
            content: `A locação será excluída do sistema de maneira definitiva`,
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                confirmaExcluir(locacao.idLocacao);
            }
        });
    }

    return (
        <div className='div-principal-locacoes'>
            <PageHeader
                className="page-header"
                title="Locações"
                extra={[
                    <Button onClick={navegarNovaLocacao} shape='round' name='botao-nova-locacao' key="botao-nova-locacao">Nova locação</Button>,
                ]}
            />
            <Divider style={{ marginTop: 10, paddingTop: 0, marginBottom: 30 }} />
            {locacoes.sincronizado && <TabelaLocacoes clicaExcluirLocacao={clicaExcluirLocacao} clicaConfirmarDevolucao={clicaConfirmarDevolucao}/>}
            {!locacoes.sincronizado && <Result
                status="warning"
                title="Ops!"
                subTitle={"Ocorreu um erro ao sincronizar as locações"}
                extra={
                    <Button shape='round' key="botao-sincronizar-locacoes" onClick={sincronizaLocacoes}>
                        Tentar novamente
                    </Button>
                }
            />}
            {locacoes.carregandoAlterar && <Loading mensagem={'Confirmando devolução...'} />}
            {locacoes.carregandoExcluir && <Loading mensagem={'Excluindo locação...'} />}
            {locacoes.carregando && <Loading mensagem={'Carregando locações...'} />}
        </div>
    )
}