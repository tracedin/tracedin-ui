import React from 'react'
import { Collapse, Descriptions, Divider, Tag, Typography } from 'antd'
import TransactionTimelineComponent from '../../components/TransactionTimelineComponent.tsx'

const data = {
  transactionId: 'da77f06ff09263210c24acf923bd9024',
  status: ['ABNORMAL', 'ERROR'],
  descriptions: [
    {
      key: '1',
      label: '시작 시간',
      children: '2024. 09. 29. 12:31:00'
    },
    {
      key: '2',
      label: '실행 시간',
      children: '200ms'
    },
    {
      key: '3',
      label: 'URL',
      children: 'http://localhost:8080/hello'
    },
    {
      key: '4',
      label: 'Status Code',
      children: <Tag color="green">200 OK</Tag>
    },
    {
      key: '5',
      label: '서비스 명',
      children: 'Hello Server'
    }
  ],
  errors: [
    {
      key: '1',
      label: 'ERRORS',
      children: 'dasdas'
    }
  ]
}

const { Title } = Typography

const TransactionDetail: React.FC = () => {
  return (
    <>
      <Title>{data.transactionId}</Title>
      {data.status.map((status, index) => (
        <Tag key={index} color="red">
          {status}
        </Tag>
      ))}
      <Divider />
      <Descriptions items={data.descriptions} />
      <Divider />
      <Collapse items={data.errors} defaultActiveKey={['1']} />
      <TransactionTimelineComponent />
    </>
  )
}

export default TransactionDetail
