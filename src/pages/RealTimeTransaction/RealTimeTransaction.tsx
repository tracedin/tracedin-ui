import React from 'react'
import { Card, Flex } from 'antd'
import RealTimeTransactionComponent from '../../components/RealTimeTransactionComponent.tsx'
import ActiveServiceListComponent from '../../components/ActiveServiceListComponent.tsx'
import TransactionListWithDateComponent from '../../components/TransactionListWithDatetimeComponent.tsx'

const RealTimeTransaction: React.FC = () => {
  return (
    <Flex gap="middle" vertical style={{ height: '100vh' }}>
      <Flex style={{ gap: '20px' }}>
        <Flex style={{ width: '20%' }} vertical>
          <Card title="활성화 서비스 목록" style={{ marginBottom: '10px', height: '100%' }}>
            <ActiveServiceListComponent />
          </Card>
        </Flex>
        <Flex style={{ width: '80%', height: '100%' }}>
          <Card title="실시간 트랜잭션">
            <RealTimeTransactionComponent />
          </Card>
        </Flex>
      </Flex>
      <Card title="트랜잭션 목록">
        <TransactionListWithDateComponent />
      </Card>
    </Flex>
  )
}

export default RealTimeTransaction
