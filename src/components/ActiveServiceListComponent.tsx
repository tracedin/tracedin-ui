import React from 'react'
import { Avatar, List } from 'antd'
import springboot from '@/assets/spring-logo.png'

interface ActiveServiceListProps {
  serviceNames: string[]
}

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

const ActiveServiceListComponent: React.FC<ActiveServiceListProps> = ({ serviceNames }: ActiveServiceListProps) => (
  <List
    itemLayout="horizontal"
    dataSource={serviceNames}
    renderItem={item => <ActiveServiceListItemComponent serviceName={item} />}
  />
)

export default ActiveServiceListComponent
