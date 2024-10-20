import React, { useState } from 'react'
import { Card, Flex } from 'antd'
import ActiveServiceListComponent from '../../components/ActiveServiceListComponent.tsx'
import useGetServiceNodes from '../../api/project/hooks/useGetServiceNodes.ts'
import useGetTraces from '../../api/trace/hooks/useGetTraces.ts'
import { TransactionListWithDateComponent, TransactionRange } from '../../components/TransactionListComponent.tsx'
import RealTimeTransactionComponent from '../../components/RealTimeTransactionComponent.tsx'

const RealTimeTransaction: React.FC = () => {
  const projectKey = localStorage.getItem('projectKey') ?? ''

  const [transactionRange, setTransactionRange] = useState<TransactionRange>({})

  const {
    data: transactionListData,
    error: transactionListError,
    isLoading: isTransactionListLoading
  } = useGetTraces({
    projectKey: projectKey,
    serviceName: 'tracedin-client',
    startTime: transactionRange.startDate,
    endTime: transactionRange.endDate
  })

  const { data: serviceNodes, error, isLoading } = useGetServiceNodes(projectKey)

  //FIXME 공통로직 추출
  if (isLoading || isTransactionListLoading) return <div>Loading...</div>
  if (error && transactionListError) return <div>Error: {error.message}</div>

  return (
    <Flex gap="middle" vertical style={{ height: '200vh' }}>
      <Flex style={{ gap: '20px' }}>
        <Flex style={{ width: '20%' }} vertical>
          <Card title="활성화 서비스 목록" style={{ marginBottom: '10px', height: '100%' }}>
            <ActiveServiceListComponent serviceNames={serviceNodes!.map(it => it.name)} />
          </Card>
        </Flex>
        <Flex style={{ width: '80%', height: '100%' }}>
          <Card title="실시간 트랜잭션">
            <RealTimeTransactionComponent />
          </Card>
        </Flex>
      </Flex>
      <Card title="트랜잭션 목록">
        <TransactionListWithDateComponent
          transactionListData={transactionListData}
          transactionRange={transactionRange}
          setTransactionRange={setTransactionRange}
        />
      </Card>
    </Flex>
  )
}

export default RealTimeTransaction
