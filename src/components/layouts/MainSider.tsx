import React, { useState } from 'react'
import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('시스템 토폴로지', 'toplogy', <PieChartOutlined />),
  getItem('실시간 트랜잭션', 'transactions', <DesktopOutlined />),
  getItem('사용자', 'users', <UserOutlined />)
]

const MainSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const handleMenuItemClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <div className="demo-logo-vertical" style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
        <Avatar icon={<DesktopOutlined />} />
        {!collapsed && <span style={{ color: '#fff', fontSize: '18px' }}>TracedIn</span>}
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuItemClick} />
    </Sider>
  )
}

export default MainSider
