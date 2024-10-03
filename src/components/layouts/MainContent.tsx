import React from 'react'
import { Breadcrumb, Layout } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'

const { Content } = Layout

const MainContent: React.FC = () => {
  const location = useLocation()
  const paths = location.pathname.split('/').filter(path => path)

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        {paths && paths.map(path => <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>)}
      </Breadcrumb>
      <Outlet />
    </Content>
  )
}

export default MainContent
