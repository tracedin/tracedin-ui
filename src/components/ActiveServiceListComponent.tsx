import React from 'react'
import { Avatar, List } from 'antd'
import springboot from '@/assets/spring-logo.png'

const data = [
  {
    serviceName: 'Hello Server'
  },
  {
    serviceName: 'World Server'
  },
  {
    serviceName: 'New Server'
  }
]

interface ActiveServiceListItemProps {
  serviceName: string
}

const ActiveServiceListItemComponent: React.FC<ActiveServiceListItemProps> = ({
  serviceName
}: ActiveServiceListItemProps) => (
  <List.Item>
    <List.Item.Meta avatar={<Avatar src={springboot} />} title={serviceName} />
  </List.Item>
)

const ActiveServiceListComponent: React.FC = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => <ActiveServiceListItemComponent serviceName={item.serviceName} />}
  />
)

export default ActiveServiceListComponent
