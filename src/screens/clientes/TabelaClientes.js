import React, { useRef, useState } from 'react'
import { Table, Space, Button, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { formataCpf, formataData } from '../../utils/formatadores';
import { definePropriedadesBusca } from '../../utils/definidores';
import { stringLimparOrdenacao, stringOrdenarAsc, stringOrdenarDesc } from '../../utils/constantes';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function TabelaClientes(props) {

    const clientes = useSelector((state) => state.clientes)
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

    const navegaAlterarCliente = (cliente) => {
        navigate(`/clientes/alterar/${cliente.idCliente}`)
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
            title: 'CPF',
            dataIndex: 'cpf',
            key: 'cpf',
            render: (text, record) => formataCpf(text),
            ...definePropriedadesBusca('cpf', infoFiltro, campoBuscaRef, realizaBusca, limpaBusca, 'CPF')
        },
        {
            title: 'Data de nascimento',
            dataIndex: 'dataNascimento',
            key: 'dataNascimento',
            showSorterTooltip: { title: infoOrdem ? (infoOrdem.columnKey === 'dataNascimento' ? (infoOrdem.order === undefined ? stringOrdenarAsc : (infoOrdem.order === 'ascend' ? stringOrdenarDesc : stringLimparOrdenacao)) : stringOrdenarAsc) : stringOrdenarAsc },
            sorter: (a, b) => new Date(a.dataNascimento) - new Date(b.dataNascimento),
            sortOrder: infoOrdem ? (infoOrdem.columnKey === 'dataNascimento' && infoOrdem.order) : false,
            render: (text, record) => formataData(record.dataNascimento)
        },
        {
            title: 'Ações',
            key: 'operacoes',
            width: 140,
            render: (text, record) =>
                clientes.clientes.length >= 1 ? (
                    <Space size={'middle'}>
                        <Tooltip title="Alterar" placement='left'>
                            <Button shape="circle" type='dashed' onClick={() => navegaAlterarCliente(record)} icon={<EditOutlined />} />
                        </Tooltip>
                        <Tooltip title="Excluir" placement='right'>
                            <Button type='dashed' danger shape="circle" onClick={() => props.clicaExcluirCliente(record)} icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Space>
                ) : null,
        }
    ]

    return (
        <Table rowKey={'idCliente'} scroll={{ x: 400 }} locale={{emptyText: 'Nenhum cliente encontrado'}} columns={colunas} dataSource={clientes.clientes} onChange={onAlteraTabela} />
    )
}