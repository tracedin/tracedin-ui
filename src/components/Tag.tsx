import { Tag as AntTag } from 'antd'
import React from 'react'

interface ErrorTagProps {
  statusCode: number
}

const ErrorTag: React.FC<ErrorTagProps> = ({ statusCode }) =>
  statusCode >= 400 ? <AntTag color="red">ERROR</AntTag> : null

interface AbnormalTagProps {
  abnormal: boolean
}

const AbnormalTag: React.FC<AbnormalTagProps> = ({ abnormal }) =>
  abnormal ? <AntTag color="red">ABNORMAL</AntTag> : null

interface HttpStatusTagProps {
  status: number
}

const HttpStatusTag: React.FC<HttpStatusTagProps> = ({ status }) => {
  let color = 'green'
  if (status >= 400 && status < 500) {
    color = 'orange'
  } else if (status >= 500) {
    color = 'red'
  }

  return <AntTag color={color}>{status}</AntTag>
}

export { AbnormalTag, HttpStatusTag, ErrorTag }
