import React from 'react'
import { Collapse } from 'antd'
import { StackTrace } from '@api/trace/schema/GetTransactionResponse.ts'

export interface ErrorDescriptionComponentProp {
  stackTrace: StackTrace
  hasError: boolean
}

const ErrorDescriptionComponent: React.FC<ErrorDescriptionComponentProp> = ({ hasError, stackTrace }) => {
  if (!hasError) return null

  return (
    <Collapse
      items={[
        {
          label: stackTrace.exceptionType,
          children: (
            <>
              <h2>{stackTrace.message}</h2>
              <div>{stackTrace.stackTrace}</div>
            </>
          )
        }
      ]}
    />
  )
}

export default ErrorDescriptionComponent
