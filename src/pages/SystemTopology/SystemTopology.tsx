import React from 'react'
import TopologyNetworkComponent from '../../components/TopologyNetworkComponent.tsx'
import { Card, Flex } from 'antd'
import HTTPMetricChartComponent from '../../components/HTTPMetricChartComponent.tsx'
import SystemMetricChartComponent from '../../components/SystemMetricChartComponent.tsx'
import useGetHTTPRequestsPerHour from '../../api/metric/hooks/useGetHTTPRequestsPerHour.ts'
import useGetNetworkTopology from '../../api/trace/hooks/useGetNetworkTopology.ts'
import { TransactionListComponent } from '../../components/TransactionListComponent.tsx'
import useGetTraces from '../../api/trace/hooks/useGetTraces.ts'

const SystemTopology: React.FC = () => {
  const projectKey = '1206887328-a7863a66-528e-4f37-b805-04e1314fb924'
  const {
    data: httpMetricData,
    error: httpMetricError,
    isLoading: isHttpMetricLoading
  } = useGetHTTPRequestsPerHour({
    projectKey: projectKey,
    name: 'tracedin-client'
  })

  const {
    data: networkTopologyData,
    error: networkTopologyError,
    isLoading: isNetworkTopologyLoading
  } = useGetNetworkTopology(projectKey)

  const {
    data: transactionListData,
    error: transactionListError,
    isLoading: isTransactionListLoading
  } = useGetTraces({
    projectKey: projectKey,
    serviceName: 'tracedin-client'
  })

  if (isHttpMetricLoading || isNetworkTopologyLoading || isTransactionListLoading) return <div>Loading...</div>
  if (httpMetricError && networkTopologyError && transactionListError)
    return <div>Error: {httpMetricError.message}</div>

  return (
    <Flex gap="middle" vertical style={{ height: '100vh' }}>
      <Flex style={{ width: '100%', gap: '20px' }}>
        <Flex style={{ width: '60%' }}>
          <Card title="시스템 토폴로지">
            <TopologyNetworkComponent networkTopologyData={networkTopologyData} />
          </Card>
        </Flex>
        <Flex style={{ width: '40%' }} vertical>
          <Card title="HTTP 메트릭" bordered style={{ marginBottom: '10px', height: '50%' }}>
            <HTTPMetricChartComponent httpMetricData={httpMetricData} />
          </Card>
          <Card title="시스템 메트릭" bordered style={{ height: '50%' }}>
            <SystemMetricChartComponent />
          </Card>
        </Flex>
      </Flex>
      <TransactionListComponent transactionListData={transactionListData} />
    </Flex>
  )
}

export default SystemTopology
