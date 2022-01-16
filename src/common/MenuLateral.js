import React, { useEffect, useState } from 'react'
import { Layout, Menu, Typography } from 'antd';
import './MenuLateral.css'
import { FaUsers } from 'react-icons/fa'
import { MdMovieCreation, MdAttachMoney, MdHome } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Sider } = Layout;

export default function MenuLateral() {

    const location = useLocation()
    const navigate = useNavigate()
    const [selectedKeys, setSelectedKeys] = useState([])

    useEffect(() => {

        let keys = []
        let pathname = location.pathname

        if (pathname.includes('clientes')) {
            keys.push('/clientes')
        } else if (pathname.includes('filmes')) {
            keys.push('/filmes')
        } else if (pathname.includes('locacoes')) {
            keys.push('/locacoes')
        } else {
            keys.push('/')
        }

        window.scrollTo({top: 0})

        setSelectedKeys(keys)
        
    }, [location.pathname])

    const onClicaMenu = (info) => {
        navigate(info.key)
    }

    return (
        <Sider collapsedWidth={0} zeroWidthTriggerStyle={{ backgroundColor: 'transparent', top: 12, WebkitTapHighlightColor: 'rgba(255,255,255,0.1)', borderTopRightRadius: 8, borderBottomRightRadius: 8 }} breakpoint='md' style={{ background: 'grey' }}>
            <div className='div-topo'>
                <Title level={3} className='title' style={{ color: 'whitesmoke', textAlign: 'center' }}>Sistema Locação</Title>
            </div>
            <Menu selectedKeys={selectedKeys} onSelect={onClicaMenu} mode="inline">
                <Menu.Item key="/" icon={<MdHome size={16} />}>
                    Inicio
                </Menu.Item>
                <Menu.Item key="/filmes" icon={<MdMovieCreation size={16} />}>
                    Filmes
                </Menu.Item>
                <Menu.Item key="/clientes" icon={<FaUsers size={16} />}>
                    Clientes
                </Menu.Item>
                <Menu.Item key="/locacoes" icon={<MdAttachMoney size={16} />}>
                    Locações
                </Menu.Item>
            </Menu>
        </Sider>
    )

}