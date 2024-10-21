import React from 'react'
import { Descriptions, Divider, Typography } from 'antd'
import TransactionTimelineComponent from '../../components/TransactionTimelineComponent.tsx'
import { useParams } from 'react-router-dom'
import { ErrorTag, HttpStatusTag } from '../../components/Tag.tsx'
import useGetTrace from '../../api/trace/hooks/useGetTrace.ts'

const { Title } = Typography

const TransactionDetail: React.FC = () => {
  const { id: traceId } = useParams()

  if (!traceId) throw Error()

  const { data: transactionData, isLoading, error } = useGetTrace(traceId)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!transactionData) return <div>No Data</div>

  const { span: traceMetaData } = transactionData
  const descriptions = [
    //TODO 시작시간 데이터 연동
    {
      label: '시작 시간',
      children: '2024. 09. 29. 12:31:00'
    },
    {
      label: '실행 시간',
      children: `${traceMetaData.duration} ms`
    },
    {
      label: 'HTTP Method',
      children: traceMetaData.data['http.method']
    },
    {
      label: 'Status Code',
      children: <HttpStatusTag status={Number(traceMetaData.data['http.status_code'])} />
    },
    {
      label: '서비스 명',
      children: traceMetaData.serviceName
    },
    {
      label: 'Request IP',
      children: traceMetaData.data['http.client_ip']
    }
  ]

  return (
    <>
      <Title>{traceMetaData.data['http.url']}</Title>
      <ErrorTag statusCode={Number(traceMetaData.data['http.status_code'])} />
      {/*TODO 이상치여부 태그 추가*/}
      <Divider />
      <Descriptions items={descriptions} />
      <Divider />
      <TransactionTimelineComponent transactionData={transactionData} />
    </>
  )
}

export default TransactionDetail
