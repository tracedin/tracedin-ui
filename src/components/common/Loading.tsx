import React from 'react'
import { Spin } from 'antd'

const Loading: React.FC = () => (
  <Spin size="large" tip="loading">
    loading
  </Spin>
)

export default Loading
