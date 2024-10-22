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

const SystemTopology: React.FC = () => {
  const projectKey = localStorage.getItem('projectKey') ?? ''
  const [currentPage, setCurrentPage] = useState(1)
  const [pagingKeys] = useState<PagingKey[]>([])

  const onPageChanged = (page: number) => {
    if (page === currentPage) return
    setCurrentPage(page)
  }

  const { data: httpMetricData } = useGetHTTPRequestsPerHour({
    projectKey: projectKey,
    name: 'tracedin-client'
  })

  const { data: networkTopologyData } = useGetNetworkTopology(projectKey)

  const { data: transactionListData } = useGetTraces({
    projectKey: projectKey,
    serviceName: 'tracedin-client',
    afterKey: pagingKeys[currentPage]
  })

  return (
    <Flex gap="middle" vertical style={{ height: '200vh' }}>
      <Flex style={{ width: '100%', gap: '20px' }}>
        <Flex style={{ width: '50%' }}>
          <Card title="시스템 토폴로지">
            <TopologyNetworkComponent networkTopologyData={networkTopologyData} />
          </Card>
        </Flex>
        <Flex style={{ width: '50%' }} vertical>
          <Card title="HTTP 메트릭" bordered style={{ marginBottom: '20px' }}>
            <HTTPMetricChartComponent httpMetricData={httpMetricData} />
          </Card>
          <Card title="시스템 메트릭">
            <SystemMetricChartComponent />
          </Card>
        </Flex>
      </Flex>
      <TransactionListComponent
        transactionListData={transactionListData}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
    </Flex>
  )
}

export default SystemTopology
