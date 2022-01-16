import React, { useEffect, useState } from 'react'
import { Statistic, Row, Col, Typography } from 'antd';
import './Inicio.css'
import { useSelector } from 'react-redux';

const { Title } = Typography

export default function Inicio() {

    const filmes = useSelector((state) => state.filmes)
    const clientes = useSelector((state) => state.clientes)
    const locacoes = useSelector((state) => state.locacoes)

    const [filmesIndisponiveis, setFilmesIndisponiveis] = useState([])

    useEffect(() => {
        let filmes = []

        locacoes.locacoes.forEach((locacao) => {
            if(locacao.dataDevolucao === null){
                filmes.push(locacao.idFilme)
            }
        })

        setFilmesIndisponiveis(Object.assign([], filmes))
    }, [locacoes.locacoes])

    return (
        <div className='div-principal-inicio'>
            <div className='div-titulo-inicio'>
                <Title level={4} style={{color: 'black'}}>Bem vindo, Admin</Title>
            </div>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Total de clientes" value={clientes.clientes.length} loading={clientes.carregando}/>
                </Col>
                <Col span={12}>
                    <Statistic title="Filmes disponíveis" value={filmes.filmes.length-filmesIndisponiveis.length} suffix={`/${filmes.filmes.length}`} loading={filmes.carregando || locacoes.carregando}/>                    
                </Col>
                <Col span={12}>
                    <Statistic title="Total de locações realizadas" value={locacoes.locacoes.length} loading={locacoes.carregando}/>
                </Col>
                <Col span={12}>
                    <Statistic title="Locações pendentes" value={filmesIndisponiveis.length} loading={locacoes.carregando}/>
                </Col>
            </Row>
        </div>
    )
}