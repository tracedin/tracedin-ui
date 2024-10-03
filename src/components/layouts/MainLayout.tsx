import React from 'react'
import { Layout } from 'antd'
import MainSider from './MainSider.tsx'
import MainHeader from './MainHeader.tsx'
import MainContent from './MainContent.tsx'

const MainLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MainSider />
      <Layout>
        <MainHeader />
        <MainContent />
      </Layout>
    </Layout>
  )
}

export default MainLayout
