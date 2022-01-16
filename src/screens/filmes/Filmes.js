import React from 'react'
import { Result, Button, PageHeader, Divider, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Filmes.css'
import TabelaFilmes from './TabelaFilmes';
import { excluirFilme, sincronizarFilmes } from '../../store/actions/filmes';
import Loading from '../../common/Loading';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal

export default function Filmes() {

    const filmes = useSelector((state) => state.filmes)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const navegarAdicionarFilme = () => {
        navigate('/filmes/adicionar-filme')
    }

    const sincronizaFilmes = () => {
        dispatch(sincronizarFilmes())
    }

    const confirmaExcluir = (filme) => {
        if(filme){
            dispatch(excluirFilme(filme))
        }
    }

    const clicaExcluirFilme = (filme) => {        
        confirm({
            title: 'Deseja prosseguir com a exclusão?',
            icon: <ExclamationCircleOutlined />,
            content: `O filme "${filme.titulo}" será excluído do sistema de maneira definitiva`,
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                confirmaExcluir(filme.idFilme);
            }
        });
    }

    return (
        <div className='div-principal-filmes'>
            <PageHeader
                className="page-header"
                title="Filmes"
                extra={[
                    <Button onClick={navegarAdicionarFilme} shape='round' name='botao-adicionar-filme' key="botao-adicionar-filme">Adicionar filme</Button>,
                ]}
            />
            <Divider style={{ marginTop: 10, paddingTop: 0, marginBottom: 30 }} />
            {filmes.sincronizado && <TabelaFilmes clicaExcluirFilme={clicaExcluirFilme}/>}
            {!filmes.sincronizado && <Result
                status="warning"
                title="Ops!"
                subTitle={"Ocorreu um erro ao sincronizar os filmes"}
                extra={
                    <Button shape='round' key="botao-sincronizar-filmes" onClick={sincronizaFilmes}>
                        Tentar novamente
                    </Button>
                }
            />}
            {filmes.carregandoExcluir && <Loading mensagem={'Excluindo filme...'} />}
            {filmes.carregando && <Loading mensagem={'Carregando filmes...'} />}
        </div>
    )
}