import React from 'react'
import { Breadcrumb, Layout } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'

const { Content } = Layout

const MainContent: React.FC = () => {
  const location = useLocation()
  const paths = location.pathname.split('/').filter(path => path)

  const items = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`
    return {
      title: <Link to={href}>{path}</Link>
    }
  })

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }} items={items} />
      <Outlet />
    </Content>
  )
}

export default MainContent
