import React from 'react'
import { Avatar, Dropdown, Layout, theme } from 'antd'
import { BellOutlined, UserOutlined } from '@ant-design/icons'

const { Header } = Layout

const MainHeader: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 16px' }}>
        <div style={{ cursor: 'pointer', padding: '0 20px' }}>
          <BellOutlined style={{ fontSize: '24px' }} />
        </div>
        <Dropdown trigger={['click']}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginRight: '16px' }}>
            <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
            <span style={{ color: '#000' }}>User Name</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  )
}

export default MainHeader
