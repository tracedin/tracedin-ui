import React, { useState } from 'react'
import { Card, Flex } from 'antd'
import TopologyNetworkComponent from '@/components/TopologyNetworkComponent.tsx'
import HTTPMetricChartComponent from '@/components/HTTPMetricChartComponent.tsx'
import SystemMetricChartComponent from '@/components/SystemMetricChartComponent.tsx'
import StatusCodeChartComponent from '@/components/StatusCodeChartComponent.tsx'
import { TransactionListComponent } from '@/components/TransactionListComponent.tsx'

import { useGetHTTPRequestsPerHour, useSystemMetricStream, useGetHTTPStatusCodeDistribution } from '@/api/metric/hooks'

import useGetNetworkTopology from '@/api/trace/hooks/useGetNetworkTopology.ts'
import useGetTraces from '@/api/trace/hooks/useGetTraces.ts'
import { PagingKey } from '@api/trace/schema/GetTransactionListResponse.ts'

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

  const { data: statusCodeMetricData } = useGetHTTPStatusCodeDistribution({
    projectKey: projectKey,
    serviceName: serviceName
  })

  const systemMetricData = useSystemMetricStream({ projectKey: projectKey, serviceName: serviceName })

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
      <Flex style={{ gap: '20px' }}>
        <Card title="HTTP 응답 비율" bordered style={{ marginBottom: '20px' }}>
          <StatusCodeChartComponent statusCodeMetricData={statusCodeMetricData} />
        </Card>
        <Card title="시스템 메트릭">
          <TransactionListComponent transactionListData={transactionListData} setPagingKey={setPagingKey} />
        </Card>
      </Flex>
    </Flex>
  )
}

export default SystemTopology
