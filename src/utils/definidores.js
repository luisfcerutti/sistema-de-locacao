import { Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const definePropriedadesBusca = (dataIndex, infoFiltro, campoBuscaRef, realizaBusca, limpaBusca, placeholder) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
            <Input
                ref={campoBuscaRef}
                placeholder={`Buscar por ${placeholder ?? 'campo'}`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => realizaBusca(selectedKeys, confirm, dataIndex)}
                style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => realizaBusca(selectedKeys, confirm, dataIndex)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Buscar
                </Button>
                <Button onClick={() => limpaBusca(clearFilters, confirm)} size="small" style={{ width: 90 }}>
                    Limpar
                </Button>
            </Space>
        </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    filteredValue: infoFiltro ? (infoFiltro[dataIndex] || null) : null,
    onFilter: (value, record) =>
        record[dataIndex]
            ? record[dataIndex].toLowerCase().includes(value.toLowerCase())
            : '',
    onFilterDropdownVisibleChange: visivel => {
        if (visivel) {
            setTimeout(() => campoBuscaRef.current.select(), 100);
        }
    }
})