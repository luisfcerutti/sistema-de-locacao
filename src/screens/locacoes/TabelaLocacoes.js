import React, { useEffect, useRef, useState } from 'react'
import { Table, Space, Button, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { formataData, formataNomeCliente, formataNomeFilme } from '../../utils/formatadores';
import { definePropriedadesBusca } from '../../utils/definidores';
import { stringLimparOrdenacao, stringOrdenarAsc, stringOrdenarDesc } from '../../utils/constantes';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function TabelaLocacoes(props) {

    const locacoes = useSelector((state) => state.locacoes)
    const clientes = useSelector((state) => state.clientes)
    const filmes = useSelector((state) => state.filmes)
    const campoBuscaRef = useRef(null)
    const navigate = useNavigate()

    const [infoFiltro, setInfoFiltro] = useState(null)
    const [infoOrdem, setInfoOrdem] = useState(null)

    const [locacoesMostrar, setLocacoesMostrar] = useState([])

    useEffect(() => {

        let locacoesTemp = Object.assign([], locacoes.locacoes)

        let locacoesSalvar = locacoesTemp.map((locacao) => {
            return { ...locacao, nomeCliente: formataNomeCliente(locacao.idCliente, clientes.clientes), nomeFilme: formataNomeFilme(locacao.idFilme, filmes.filmes) }
        })

        setLocacoesMostrar(Object.assign([], locacoesSalvar))

    },[locacoes])

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

    const navegaAlterarLocacao = (locacao) => {
        navigate(`/locacoes/alterar/${locacao.idLocacao}`)
    }

    const colunas = [
        {
            title: 'Filme',
            dataIndex: 'nomeFilme',
            key: 'nomeFilme',
            ...definePropriedadesBusca('nomeFilme', infoFiltro, campoBuscaRef, realizaBusca, limpaBusca, 'nome do filme'),
            sorter: (a, b) => a.nomeFilme.localeCompare(b.nomeFilme),
            sortOrder: infoOrdem ? (infoOrdem.columnKey === 'nomeFilme' && infoOrdem.order) : false,
            showSorterTooltip: { title: infoOrdem ? (infoOrdem.columnKey === 'nomeFilme' ? (infoOrdem.order === undefined ? stringOrdenarAsc : (infoOrdem.order === 'ascend' ? stringOrdenarDesc : stringLimparOrdenacao)) : stringOrdenarAsc) : stringOrdenarAsc },
        },
        {
            title: 'Cliente',
            dataIndex: 'nomeCliente',
            key: 'nomeCliente',
            ...definePropriedadesBusca('nomeCliente', infoFiltro, campoBuscaRef, realizaBusca, limpaBusca, 'nome do cliente'),
            sorter: (a, b) => a.nomeCliente.localeCompare(b.nomeCliente),
            sortOrder: infoOrdem ? (infoOrdem.columnKey === 'nomeCliente' && infoOrdem.order) : false,
            showSorterTooltip: { title: infoOrdem ? (infoOrdem.columnKey === 'nomeCliente' ? (infoOrdem.order === undefined ? stringOrdenarAsc : (infoOrdem.order === 'ascend' ? stringOrdenarDesc : stringLimparOrdenacao)) : stringOrdenarAsc) : stringOrdenarAsc },
        },
        {
            title: 'Data locação',
            dataIndex: 'dataLocacao',
            key: 'dataLocacao',
            showSorterTooltip: { title: infoOrdem ? (infoOrdem.columnKey === 'dataLocacao' ? (infoOrdem.order === undefined ? stringOrdenarAsc : (infoOrdem.order === 'ascend' ? stringOrdenarDesc : stringLimparOrdenacao)) : stringOrdenarAsc) : stringOrdenarAsc },
            sorter: (a, b) => a.dataLocacao - b.dataLocacao,
            sortOrder: infoOrdem ? (infoOrdem.columnKey === 'dataLocacao' && infoOrdem.order) : false,
            render: (text, record) => formataData(record.dataLocacao)
        },
        {
            title: 'Data devolução',
            dataIndex: 'dataDevolucao',
            key: 'dataDevolucao',
            showSorterTooltip: { title: infoOrdem ? (infoOrdem.columnKey === 'dataDevolucao' ? (infoOrdem.order === undefined ? stringOrdenarAsc : (infoOrdem.order === 'ascend' ? stringOrdenarDesc : stringLimparOrdenacao)) : stringOrdenarAsc) : stringOrdenarAsc },
            sorter: (a, b) => a.dataDevolucao - b.dataDevolucao,
            sortOrder: infoOrdem ? (infoOrdem.columnKey === 'dataDevolucao' && infoOrdem.order) : false,
            render: (text, record) => formataData(record.dataDevolucao)
        },
        {
            title: 'Ações',
            key: 'operacoes',
            width: 170,
            render: (text, record) =>
                locacoesMostrar.length >= 1 ? (
                    <Space size={'middle'}> 
                        <Tooltip title="Alterar" placement='left'>
                            <Button shape="circle" type='dashed' onClick={() => navegaAlterarLocacao(record)} icon={<EditOutlined />} />
                        </Tooltip>
                        <Tooltip title="Excluir" placement='right'>
                            <Button type='dashed' danger shape="circle" onClick={() => props.clicaExcluirLocacao(record)} icon={<DeleteOutlined />} />
                        </Tooltip>
                        {record.dataDevolucao === null && <Tooltip title="Confirmar devolução" placement='left'>
                            <Button shape="circle" type='dashed' onClick={() => props.clicaConfirmarDevolucao(record)} icon={<CheckOutlined />} />
                        </Tooltip>}
                    </Space>
                ) : null,
        }
    ]

    return (
        <Table rowKey={'idLocacao'} scroll={{ x: 400 }} locale={{emptyText: 'Nenhuma locação encontrada'}} columns={colunas} dataSource={locacoesMostrar} onChange={onAlteraTabela} />
    )
}