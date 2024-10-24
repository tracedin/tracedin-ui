import React, { useState } from 'react'
import TopologyNetworkComponent from '../../components/TopologyNetworkComponent.tsx'
import { Card, Flex } from 'antd'
import HTTPMetricChartComponent from '../../components/HTTPMetricChartComponent.tsx'
import SystemMetricChartComponent from '../../components/SystemMetricChartComponent.tsx'
import useGetHTTPRequestsPerHour from '../../api/metric/hooks/useGetHTTPRequestsPerHour.ts'
import useGetNetworkTopology from '../../api/trace/hooks/useGetNetworkTopology.ts'
import { TransactionListComponent } from '../../components/TransactionListComponent.tsx'
import useGetTraces from '../../api/trace/hooks/useGetTraces.ts'
import { PagingKey } from '../../api/trace/schema/GetTransactionListResponse.ts'
import useSystemMetricStream from '../../api/metric/hooks/useSystemMetricStream.ts'

const SystemTopology: React.FC = () => {
  const projectKey = localStorage.getItem('projectKey') ?? ''

  const [serviceName, setServiceName] = useState<string>()
  const [pagingKey, setPagingKey] = useState<PagingKey>()

  const { data: httpMetricData } = useGetHTTPRequestsPerHour({
    projectKey: projectKey,
    name: serviceName
  })

  const { data: networkTopologyData } = useGetNetworkTopology(projectKey)

  const { data: transactionListData } = useGetTraces({
    projectKey: projectKey,
    serviceName: serviceName,
    afterKey: pagingKey
  })

  const systemMetricData = useSystemMetricStream({ projectKey: projectKey, serviceName: 'tracedin-client' })

  return (
    <Flex gap="middle" vertical style={{ height: '200vh' }}>
      <Flex style={{ width: '100%', gap: '20px' }}>
        <Flex style={{ width: '50%' }}>
          <Card title="시스템 토폴로지" style={{ width: '100%' }}>
            <TopologyNetworkComponent networkTopologyData={networkTopologyData} setServiceName={setServiceName} />
          </Card>
        </Flex>
        <Flex style={{ width: '50%' }} vertical>
          <Card title="HTTP 메트릭" bordered style={{ marginBottom: '20px' }}>
            <HTTPMetricChartComponent httpMetricData={httpMetricData} />
          </Card>
          <Card title="시스템 메트릭">
            <SystemMetricChartComponent systemMetricData={systemMetricData} />
          </Card>
        </Flex>
      </Flex>
      <TransactionListComponent transactionListData={transactionListData} setPagingKey={setPagingKey} />
    </Flex>
  )
}

export default SystemTopology
