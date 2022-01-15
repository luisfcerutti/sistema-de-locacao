import React from 'react'
import { Typography, Spin } from 'antd';
import './Loading.css'

const { Text } = Typography;

export default function Loading(props) {

    return (
        <div className='fundo'>
            <div className='div-principal-loading'>
                <Spin size='large'/>
                <div className='div-texto'>
                    <Text className='texto'>{props.mensagem ?? `Carregando...`}</Text>
                </div>
            </div>
        </div>
    )
}