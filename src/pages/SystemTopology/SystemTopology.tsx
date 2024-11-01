import React, { useState } from 'react'
import { Card, Divider, Flex, Select } from 'antd'
import TopologyNetworkComponent from '@/components/TopologyNetworkComponent.tsx'
import HTTPMetricChartComponent from '@/components/HTTPMetricChartComponent.tsx'
import SystemMetricChartComponent from '@/components/SystemMetricChartComponent.tsx'
import StatusCodeChartComponent from '@/components/StatusCodeChartComponent.tsx'

import { useGetHTTPRequestsPerHour, useGetHTTPStatusCodeDistribution, useSystemMetricStream } from '@/api/metric/hooks'

import useGetNetworkTopology from '@/api/trace/hooks/useGetNetworkTopology.ts'
import useGetServiceEndpoints from '@/api/trace/hooks/useGetServiceEndpoints.ts'
import ServiceEndpointListComponent from '@/components/ServiceEndpointListComponent.tsx'

const SystemTopology: React.FC = () => {
  const projectKey = localStorage.getItem('projectKey') ?? ''

  const [serviceName, setServiceName] = useState<string>()
  const [serviceEndPoint, setServiceEndPoint] = useState<string>()

  const { data: httpMetricData } = useGetHTTPRequestsPerHour({
    projectKey: projectKey,
    name: serviceName,
    endPointUrl: serviceEndPoint
  })

  const { data: networkTopologyData } = useGetNetworkTopology(projectKey)

  const { data: statusCodeMetricData } = useGetHTTPStatusCodeDistribution({
    projectKey: projectKey,
    serviceName: serviceName,
    endPointUrl: serviceEndPoint
  })

  const { data: serviceEndpointData } = useGetServiceEndpoints({
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
          <Card title="서비스 엔드포인트">
            <Select
              defaultValue={serviceEndPoint}
              style={{ width: '100%' }}
              allowClear
              onChange={(value: string) => setServiceEndPoint(value)}
              options={serviceEndpointData.map(it => ({ value: it, label: it }))}
            />
            <Divider />
            <ServiceEndpointListComponent
              serviceEndpointData={serviceEndpointData}
              setServiceEndPoint={setServiceEndPoint}
            />
          </Card>
        </Flex>
      </Flex>
      <Flex style={{ gap: '20px' }}>
        <Flex style={{ width: '50%' }}>
          <Card title="HTTP 응답 비율" bordered style={{ marginBottom: '20px' }}>
            <StatusCodeChartComponent statusCodeMetricData={statusCodeMetricData} />
          </Card>
        </Flex>
        <Flex style={{ width: '90%' }}>
          <Card title="시스템 메트릭" style={{ width: '100%' }}>
            <SystemMetricChartComponent systemMetricData={systemMetricData} />
          </Card>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SystemTopology
