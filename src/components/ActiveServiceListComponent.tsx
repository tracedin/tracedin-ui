import React, { Dispatch, SetStateAction } from 'react'
import { Avatar, List } from 'antd'
import springboot from '@/assets/spring-logo.png'

interface ActiveServiceListProps {
  serviceNames: string[]
  setServiceName: Dispatch<SetStateAction<string | undefined>>
}

interface ActiveServiceListItemProps {
  serviceName: string
  setServiceName: Dispatch<SetStateAction<string | undefined>>
}

const ActiveServiceListItemComponent: React.FC<ActiveServiceListItemProps> = ({
  serviceName,
  setServiceName
}: ActiveServiceListItemProps) => (
  <List.Item onClick={() => setServiceName(serviceName)}>
    <List.Item.Meta avatar={<Avatar src={springboot} />} title={serviceName} />
  </List.Item>
)

const ActiveServiceListComponent: React.FC<ActiveServiceListProps> = ({
  serviceNames,
  setServiceName
}: ActiveServiceListProps) => (
  <List
    itemLayout="horizontal"
    dataSource={serviceNames}
    renderItem={item => <ActiveServiceListItemComponent serviceName={item} setServiceName={setServiceName} />}
  />
)

export default ActiveServiceListComponent
