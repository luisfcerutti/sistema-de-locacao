import React from 'react'
import { Layout, Button } from 'antd';
import MenuLateral from './MenuLateral';
import { LogoutOutlined } from '@ant-design/icons';
import './LayoutBase.css'
import { useDispatch } from 'react-redux';
import { deslogar } from '../store/actions/usuario';

const { Header, Content } = Layout;

export default function LayoutBase({ children }) {

    const dispatch = useDispatch()

    const clicaDesconectar = () => {
        dispatch(deslogar())
    }

    return (
        <Layout>
            <MenuLateral />
            <Layout>
                <Header className='cabecalho'>
                    <Button size={'small'} shape='round' className='botao-deslogar' onClick={clicaDesconectar} icon={<LogoutOutlined />}>Sair</Button>
                </Header>
                <Content
                    style={{
                        minHeight: "calc(100vh - 55px)",
                        margin: '24px 16px',
                    }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}