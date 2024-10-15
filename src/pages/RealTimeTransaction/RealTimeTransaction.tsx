import React from 'react'
import { Card, Flex } from 'antd'
import ActiveServiceListComponent from '../../components/ActiveServiceListComponent.tsx'
import useGetServiceNodes from '../../api/project/hooks/useGetServiceNodes.ts'
import TransactionHeatmapComponent from '../../components/TransactionHeatmapComponent.tsx'
import useGetTraces from '../../api/trace/hooks/useGetTraces.ts'
import { TransactionListWithDateComponent } from '../../components/TransactionListComponent.tsx'

const RealTimeTransaction: React.FC = () => {
  //TODO 프로젝트 기능 연동후 삭제
  const projectKey = '1206887328-a7863a66-528e-4f37-b805-04e1314fb924'
  const { data: serviceNodes, error, isLoading } = useGetServiceNodes(projectKey)

  const {
    data: transactionListData,
    error: transactionListError,
    isLoading: isTransactionListLoading
  } = useGetTraces({
    projectKey: projectKey,
    serviceName: 'tracedin-client'
  })

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
            <TransactionHeatmapComponent />
          </Card>
        </Flex>
      </Flex>
      <Card title="트랜잭션 목록">
        <TransactionListWithDateComponent transactionListData={transactionListData} />
      </Card>
    </Flex>
  )
}

export default RealTimeTransaction
