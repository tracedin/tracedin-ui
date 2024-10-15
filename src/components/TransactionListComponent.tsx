import React from 'react'
import type { TableProps } from 'antd'
import { DatePicker, Space, Table } from 'antd'
import moment from 'moment'
import { AbnormalTag, HttpStatusTag } from './Tag.tsx'
import {
  GetTransactionListResponse,
  TransactionListItemResponse
} from '../api/trace/schema/GetTransactionListResponse.ts'

const { RangePicker } = DatePicker

type ColumnsType<T extends object> = TableProps<T>['columns']

const formatDate = (dateString: string) => moment(dateString).format('YYYY.MM.DD HH:mm:ss')

const formatResponseTime = (responseTime: number) => `${responseTime} ms`

const formatAbnormalTag = (abnormal: boolean) => <AbnormalTag abnormal={abnormal} />

const formatStatusCode = (status: number) => <HttpStatusTag status={status} />

const columns: ColumnsType<Transaction> = [
  {
    title: 'TRACE ID',
    dataIndex: 'traceId',
    key: 'traceId'
  },
  {
    title: 'API URL',
    dataIndex: 'endPoint',
    key: 'endPoint'
  },
  {
    title: 'SERVICE NAME',
    dataIndex: 'serviceName',
    key: 'serviceName'
  },
  {
    title: 'RESPONSE TIME',
    dataIndex: 'duration',
    key: 'duration',
    render: formatResponseTime
  },
  {
    title: 'DATE',
    dataIndex: 'startDateTime',
    key: 'startDateTime',
    render: formatDate
  },
  {
    title: 'STATUS',
    dataIndex: 'statusCode',
    key: 'statusCode',
    render: formatStatusCode
  },
  {
    title: '',
    key: 'abnormal',
    dataIndex: 'abnormal',
    render: formatAbnormalTag
  }
]

interface TransactionListComponentProps {
  transactionListData: GetTransactionListResponse | undefined
}

interface Transaction extends TransactionListItemResponse {
  abnormal: boolean
}

interface TransactionListWithDateComponentProps extends TransactionListComponentProps {
  startDateTime?: string
  endDateTime?: string
}

const TransactionListComponent: React.FC<TransactionListComponentProps> = ({ transactionListData }) => {
  const transactions: Transaction[] = (transactionListData?.results ?? []).map(it => ({ ...it, abnormal: true }))

  return <Table<Transaction> columns={columns} pagination={{ position: ['bottomCenter'] }} dataSource={transactions} />
}

const TransactionListWithDateComponent: React.FC<TransactionListWithDateComponentProps> = ({ transactionListData }) => {
  return (
    <Space direction="vertical" size={15} style={{ width: '100%' }}>
      <RangePicker renderExtraFooter={() => 'extra footer'} showTime />
      <TransactionListComponent transactionListData={transactionListData} />
    </Space>
  )
}

export { TransactionListComponent, TransactionListWithDateComponent }
