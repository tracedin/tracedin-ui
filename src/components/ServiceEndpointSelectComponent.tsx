import React, { Dispatch, SetStateAction } from 'react'
import { Select } from 'antd'

interface ServiceEndpointSelectProps {
  serviceEndpointData: string[]
  selectedEndpoint: string | undefined
  setServiceEndPoint: Dispatch<SetStateAction<string | undefined>>
  width?: string
}

const ServiceEndpointSelectComponent: React.FC<ServiceEndpointSelectProps> = ({
  serviceEndpointData,
  setServiceEndPoint,
  selectedEndpoint,
  width = '100%'
}) => {
  return (
    <Select
      style={{ width: width }}
      allowClear
      onChange={(value: string) => setServiceEndPoint(value)}
      options={serviceEndpointData.map(it => ({ value: it, label: it }))}
      value={selectedEndpoint}
    />
  )
}

export default ServiceEndpointSelectComponent
