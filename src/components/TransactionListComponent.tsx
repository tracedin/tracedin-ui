import React from 'react'
import type { TableProps } from 'antd'
import { Table, Tag } from 'antd'
import moment from 'moment'

type ColumnsType<T extends object> = TableProps<T>['columns']

interface TransactionListData {
  traceId: string
  apiUrl: string
  serviceName: string
  responseTime: number
  date: string
  status: number
  abnormal: boolean
}

const formatDate = (dateString: string) => moment(dateString).format('YYYY:MM:DD HH:mm:ss')

const formatResponseTime = (responseTime: number) => `${responseTime} ms`

const formatAbnormalTag = (abnormal: boolean) => (abnormal ? <Tag color="red">ABNORMAL</Tag> : null)

const formatStatusCode = (status: number) => {
  let color = 'green'
  if (status >= 400 && status < 500) {
    color = 'orange'
  } else if (status >= 500) {
    color = 'red'
  }

  return <Tag color={color}>{status}</Tag>
}
const columns: ColumnsType<TransactionListData> = [
  {
    title: 'TRACE ID',
    dataIndex: 'traceId',
    key: 'traceId'
  },
  {
    title: 'API URL',
    dataIndex: 'apiUrl',
    key: 'apiUrl'
  },
  {
    title: 'SERVICE NAME',
    dataIndex: 'serviceName',
    key: 'serviceName'
  },
  {
    title: 'RESPONSE TIME',
    dataIndex: 'responseTime',
    key: 'responseTime',
    render: formatResponseTime
  },
  {
    title: 'DATE',
    dataIndex: 'date',
    key: 'date',
    render: formatDate
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    key: 'status',
    render: formatStatusCode
  },
  {
    title: '',
    key: 'abnormal',
    dataIndex: 'abnormal',
    render: formatAbnormalTag
  }
]

const data: TransactionListData[] = [
  {
    traceId: '000001',
    apiUrl: 'http://api.example.com/get-data',
    serviceName: 'World Server',
    responseTime: 200,
    date: '2024-10-01T12:30:45Z',
    status: 200,
    abnormal: false
  },
  {
    traceId: '000002',
    apiUrl: 'http://api.example.com/post-data',
    serviceName: 'Hello Server',
    responseTime: 500,
    date: '2024-10-02T13:15:30Z',
    status: 404,
    abnormal: true
  },
  {
    traceId: '000003',
    apiUrl: 'http://api.example.com/update-data',
    serviceName: 'New Server',
    responseTime: 300,
    date: '2024-10-03T14:45:00Z',
    status: 500,
    abnormal: false
  }
]

const TransactionListComponent: React.FC = () => {
  return <Table<TransactionListData> columns={columns} pagination={{ position: ['bottomCenter'] }} dataSource={data} />
}

export default TransactionListComponent
