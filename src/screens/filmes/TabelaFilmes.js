import React, { useRef, useState } from 'react'
import { Table, Space, Button, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { formataClassificacaoIndicativa } from '../../utils/formatadores';
import { definePropriedadesBusca } from '../../utils/definidores';
import { stringLimparOrdenacao, stringOrdenarAsc, stringOrdenarDesc } from '../../utils/constantes';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function TabelaFilmes(props) {

    const filmes = useSelector((state) => state.filmes)
    const campoBuscaRef = useRef(null)
    const navigate = useNavigate()

    const [infoFiltro, setInfoFiltro] = useState(null)
    const [infoOrdem, setInfoOrdem] = useState(null)

    const realizaBusca = (selectedKeys, confirm, dataIndex) => {
        confirm();
    }

    const limpaBusca = (clearFilters, confirm) => {
        clearFilters()
        confirm()
        setInfoFiltro(null)
    }

    const onAlteraTabela = (pagination, filters, sorter) => {
        setInfoFiltro(filters)
        setInfoOrdem(sorter)
    }

    const navegaAlterarFilme = (filme) => {
        navigate(`/filmes/alterar/${filme.idFilme}`)
    }

    const colunas = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            ...definePropriedadesBusca('nome', infoFiltro, campoBuscaRef, realizaBusca, limpaBusca, 'nome'),
            sorter: (a, b) => a.nome.localeCompare(b.nome),
            sortOrder: infoOrdem ? (infoOrdem.columnKey === 'nome' && infoOrdem.order) : false,
            showSorterTooltip: { title: infoOrdem ? (infoOrdem.columnKey === 'nome' ? (infoOrdem.order === undefined ? stringOrdenarAsc : (infoOrdem.order === 'ascend' ? stringOrdenarDesc : stringLimparOrdenacao)) : stringOrdenarAsc) : stringOrdenarAsc },
        },
        {
            title: 'Classificação Indicativa',
            dataIndex: 'classificacaoIndicativa',
            key: 'classificacaoIndicativa',
            showSorterTooltip: { title: infoOrdem ? (infoOrdem.columnKey === 'classificacaoIndicativa' ? (infoOrdem.order === undefined ? stringOrdenarAsc : (infoOrdem.order === 'ascend' ? stringOrdenarDesc : stringLimparOrdenacao)) : stringOrdenarAsc) : stringOrdenarAsc },
            sorter: (a, b) => a.classificacaoIndicativa - b.classificacaoIndicativa,
            sortOrder: infoOrdem ? (infoOrdem.columnKey === 'classificacaoIndicativa' && infoOrdem.order) : false,
            render: (text, record) => formataClassificacaoIndicativa(text),
        },
        {
            title: 'Lançamento',
            dataIndex: 'lancamento',
            key: 'lancamento',
            showSorterTooltip: { title: infoOrdem ? (infoOrdem.columnKey === 'lancamento' ? (infoOrdem.order === undefined ? stringOrdenarAsc : (infoOrdem.order === 'ascend' ? stringOrdenarDesc : stringLimparOrdenacao)) : stringOrdenarAsc) : stringOrdenarAsc },
            sorter: (a, b) => a.lancamento - b.lancamento,
            sortOrder: infoOrdem ? (infoOrdem.columnKey === 'lancamento' && infoOrdem.order) : false,
            render: (text, record) => record.lancamento === 1 ? 'Sim' : 'Não'
        },
        {
            title: 'Ações',
            key: 'operacoes',
            width: 140,
            render: (text, record) =>
                filmes.filmes.length >= 1 ? (
                    <Space size={'middle'}>
                        <Tooltip title="Alterar" placement='left'>
                            <Button shape="circle" type='dashed' onClick={() => navegaAlterarFilme(record)} icon={<EditOutlined />} />
                        </Tooltip>
                        <Tooltip title="Excluir" placement='right'>
                            <Button type='dashed' danger shape="circle" onClick={() => props.clicaExcluirFilme(record)} icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Space>
                ) : null,
        }
    ]

    return (
        <Table rowKey={'idFilme'} scroll={{ x: 400 }} locale={{emptyText: 'Nenhum filme encontrado'}} columns={colunas} dataSource={filmes.filmes} onChange={onAlteraTabela} />
    )
}