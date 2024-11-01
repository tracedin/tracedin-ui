import React, { Dispatch, SetStateAction } from 'react'
import { Avatar, List } from 'antd'
import springboot from '@/assets/spring-logo.png'

interface ServiceEndpointListComponentProps {
  serviceEndpointData: string[]
  setServiceEndPoint: Dispatch<SetStateAction<string | undefined>>
}

interface ServiceEndpointListItemProps {
  serviceEndpoint: string
  setServiceEndPoint: Dispatch<SetStateAction<string | undefined>>
}

const ServiceEndpointListItemComponent: React.FC<ServiceEndpointListItemProps> = ({
  serviceEndpoint,
  setServiceEndPoint
}) => (
  <List.Item onClick={() => setServiceEndPoint(serviceEndpoint)}>
    <List.Item.Meta avatar={<Avatar src={springboot} />} title={serviceEndpoint} />
  </List.Item>
)

const ServiceEndpointListComponent: React.FC<ServiceEndpointListComponentProps> = ({
  serviceEndpointData,
  setServiceEndPoint
}) => {
  const serviceEndpoints = serviceEndpointData ?? []

  return (
    <div style={{ height: 250, overflowY: 'auto' }}>
      <List
        itemLayout="horizontal"
        dataSource={serviceEndpoints}
        renderItem={item => (
          <ServiceEndpointListItemComponent serviceEndpoint={item} setServiceEndPoint={setServiceEndPoint} />
        )}
      />
    </div>
  )
}

export default ServiceEndpointListComponent
