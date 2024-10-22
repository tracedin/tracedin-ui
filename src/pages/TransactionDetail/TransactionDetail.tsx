import React from 'react'
import { Descriptions, Divider, Typography } from 'antd'
import TransactionTimelineComponent from '../../components/TransactionTimelineComponent.tsx'
import { useParams } from 'react-router-dom'
import { ErrorTag, HttpStatusTag } from '../../components/Tag.tsx'
import useGetTrace from '../../api/trace/hooks/useGetTrace.ts'
import moment from 'moment'
import { Span } from '../../api/trace/schema/GetTransactionResponse.ts'

const { Title } = Typography

const resolveDescription = (traceMetaData: Span) => [
  {
    label: '시작 시간',
    children: moment(traceMetaData.startDateTime).format('YYYY-MM-DD:HH:MM:SS')
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

const TransactionDetail: React.FC = () => {
  const { id: traceId } = useParams()

  if (!traceId) throw Error()

  const { data: transactionData } = useGetTrace(traceId)

  if (!transactionData) throw Error()

  const { span: traceMetaData } = transactionData
  const descriptions = resolveDescription(traceMetaData)

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
