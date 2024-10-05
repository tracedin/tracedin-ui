import React from 'react'
import TopologyNetworkComponent from '../../components/TopologyNetworkComponent.tsx'
import { Card, Flex } from 'antd'
import TransactionListComponent from '../../components/TransactionListComponent.tsx'
import HTTPMetricChartComponent from '../../components/HTTPMetricChartComponent.tsx'
import SystemMetricChartComponent from '../../components/SystemMetricChartComponent.tsx'

const SystemTopology: React.FC = () => {
  return (
    <Flex gap="middle" vertical style={{ height: '100vh' }}>
      <Flex style={{ width: '100%', borderRight: '1px solid #ccc', height: '100%', gap: '20px' }}>
        <Flex style={{ width: '60%', height: '100%' }}>
          <Card title="시스템 토폴로지" bordered style={{ width: '100%' }}>
            <TopologyNetworkComponent />
          </Card>
        </Flex>
        <Flex style={{ width: '40%', height: '100%' }} vertical>
          <Card title="HTTP 메트릭" bordered style={{ width: '100%', marginBottom: '10px', height: '50%' }}>
            <HTTPMetricChartComponent />
          </Card>
          <Card title="시스템 메트릭" bordered style={{ width: '100%', height: '50%' }}>
            <SystemMetricChartComponent />
          </Card>
        </Flex>
      </Flex>
      <TransactionListComponent />
    </Flex>
  )
}

export default SystemTopology
