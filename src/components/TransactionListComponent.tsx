import React, { Dispatch, SetStateAction, useState } from 'react'
import type { TableProps } from 'antd'
import { DatePicker, Space, Table } from 'antd'
import moment from 'moment'
import { AbnormalTag, HttpStatusTag } from './Tag.tsx'
import {
  GetTransactionListResponse,
  TransactionListItemResponse
} from '../api/trace/schema/GetTransactionListResponse.ts'
import { RangePickerProps } from 'antd/es/date-picker'
import { Dayjs } from 'dayjs'
import { useNavigate } from 'react-router-dom'

const { RangePicker } = DatePicker

type ColumnsType<T extends object> = TableProps<T>['columns']

const columns: ColumnsType<TransactionListItem> = [
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
    render: (responseTime: number) => `${responseTime} ms`
  },
  {
    title: 'DATE',
    dataIndex: 'startDateTime',
    key: 'startDateTime',
    render: (dateString: string) => moment(dateString).format('YYYY.MM.DD HH:mm:ss')
  },
  {
    title: 'STATUS',
    dataIndex: 'statusCode',
    key: 'statusCode',
    render: (status: number) => <HttpStatusTag status={status} />
  },
  {
    title: '',
    key: 'abnormal',
    dataIndex: 'abnormal',
    render: (abnormal: boolean) => <AbnormalTag abnormal={abnormal} />
  }
]

interface TransactionListComponentProps {
  transactionListData: GetTransactionListResponse | undefined
}

interface TransactionListItem extends TransactionListItemResponse {
  abnormal: boolean
}

const TransactionListComponent: React.FC<TransactionListComponentProps> = ({ transactionListData }) => {
  const navigate = useNavigate()

  //TODO 이상치탐지 연동 필요
  const transactions: TransactionListItem[] = (transactionListData?.results ?? []).map(it => ({
    ...it,
    abnormal: true
  }))
  const totalCount = transactionListData?.totalCount ?? 0
  const [currentPage, setCurrentPage] = useState(1)

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onRowClick = (traceId: string) => {
    navigate(`/transactions/${traceId}`)
  }

  return (
    <Table<TransactionListItem>
      columns={columns}
      pagination={{
        position: ['bottomCenter'],
        current: currentPage,
        pageSize: 10,
        total: totalCount,
        onChange: onPageChange
      }}
      onRow={record => {
        return {
          onClick: () => onRowClick(record.traceId)
        }
      }}
      dataSource={transactions}
    />
  )
}

export interface TransactionRange {
  startDate?: Dayjs
  endDate?: Dayjs
}

interface TransactionListWithDateComponentProps extends TransactionListComponentProps {
  transactionRange: TransactionRange
  setTransactionRange: Dispatch<SetStateAction<TransactionRange>>
}

const TransactionListWithDateComponent: React.FC<TransactionListWithDateComponentProps> = props => {
  const { transactionListData, transactionRange, setTransactionRange } = props

  const onOk = (value: RangePickerProps['value']) => {
    if (!value || !value[0] || !value[1]) {
      alert('값을 입력해주세요')
      return
    }

    const [startDate, endDate] = value

    if (startDate.isAfter(endDate)) {
      alert('시작일이 종료일을 넘을 수 없습니다')
      return
    }

    setTransactionRange({ startDate, endDate })
  }

  return (
    <Space direction="vertical" size={15} style={{ width: '100%' }}>
      <RangePicker showTime value={[transactionRange.startDate, transactionRange.endDate]} onOk={onOk} />
      <TransactionListComponent transactionListData={transactionListData} />
    </Space>
  )
}

export { TransactionListComponent, TransactionListWithDateComponent }
