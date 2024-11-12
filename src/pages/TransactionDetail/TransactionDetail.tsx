import React from 'react'
import { Descriptions, Divider, Typography } from 'antd'
import TransactionTimelineComponent from '../../components/TransactionTimelineComponent.tsx'
import { useParams } from 'react-router-dom'
import { AbnormalTag, ErrorTag, HttpStatusTag } from '../../components/Tag.tsx'
import useGetTrace from '../../api/trace/hooks/useGetTrace.ts'
import moment from 'moment'
import { Span } from '@/api/trace/schema/GetTransactionResponse.ts'
import ErrorDescriptionComponent from '@/components/ErrorDescriptionComponent.tsx'

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

  const { span: traceMetaData, hasError, hasAnomaly, stackTrace } = transactionData
  const descriptions = resolveDescription(traceMetaData)

  return (
    <>
      <Title>{traceMetaData.data['http.url']}</Title>
      <ErrorTag statusCode={Number(traceMetaData.data['http.status_code'])} />
      <AbnormalTag abnormal={hasAnomaly} />
      <Divider />
      <Descriptions items={descriptions} />
      <Divider />
      <ErrorDescriptionComponent hasError={hasError} stackTrace={stackTrace} />
      <Divider />
      <TransactionTimelineComponent transactionData={transactionData} />
    </>
  )
}

export default TransactionDetail
