import React, { useState } from 'react'
import { Card, Flex } from 'antd'
import ActiveServiceListComponent from '../../components/ActiveServiceListComponent.tsx'
import useGetServiceNodes from '../../api/project/hooks/useGetServiceNodes.ts'
import useGetTraces from '../../api/trace/hooks/useGetTraces.ts'
import { TransactionListWithDateComponent, TransactionRange } from '../../components/TransactionListComponent.tsx'
import TransactionHeatmapComponent from '../../components/TransactionHeatmapComponent.tsx'
import useGetTransactionHeatmap from '../../api/metric/hooks/useGetTransactionHeatmap.ts'
import { PagingKey } from '../../api/trace/schema/GetTransactionListResponse.ts'

const RealTimeTransaction: React.FC = () => {
  const projectKey = localStorage.getItem('projectKey') ?? ''

  const [serviceName, setServiceName] = useState<string>()
  const [transactionRange, setTransactionRange] = useState<TransactionRange>({})
  const [pagingKey, setPagingKey] = useState<PagingKey>()

  const { data: transactionListData } = useGetTraces({
    projectKey: projectKey,
    serviceName: serviceName,
    startTime: transactionRange.startDate,
    endTime: transactionRange.endDate,
    afterKey:pagingKey
  })

  const { data: serviceNodes } = useGetServiceNodes(projectKey)

  const { data: transactionHeatmapData } = useGetTransactionHeatmap({
    projectKey: projectKey,
    serviceName: serviceName
  })

  return (
    <Flex gap="middle" vertical style={{ height: '200vh' }}>
      <Flex style={{ gap: '20px' }}>
        <Flex style={{ width: '20%' }} vertical>
          <Card title="활성화 서비스 목록" style={{ marginBottom: '10px', height: '100%' }}>
            <ActiveServiceListComponent
              serviceNames={serviceNodes!.map(it => it.name)}
              setServiceName={setServiceName}
            />
          </Card>
        </Flex>
        <Flex style={{ width: '80%', height: '100%' }}>
          <Card title="트랜잭션 히트맵">
            <TransactionHeatmapComponent transactionHeatmapData={transactionHeatmapData} />
          </Card>
        </Flex>
      </Flex>
      <Card title="트랜잭션 목록">
        <TransactionListWithDateComponent
          transactionListData={transactionListData}
          transactionRange={transactionRange}
          setTransactionRange={setTransactionRange}
          setPagingKey={setPagingKey}
        />
      </Card>
    </Flex>
  )
}

export default RealTimeTransaction
