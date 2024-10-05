import TransactionListComponent from './TransactionListComponent.tsx'
import React from 'react'
import { DatePicker, Space } from 'antd'

const { RangePicker } = DatePicker

const TransactionListWithDateComponent: React.FC = () => {
  return (
    <Space direction="vertical" size={15} style={{ width: '100%' }}>
      <RangePicker renderExtraFooter={() => 'extra footer'} showTime />
      <TransactionListComponent />
    </Space>
  )
}

export default TransactionListWithDateComponent
