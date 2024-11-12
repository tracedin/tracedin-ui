export interface GetTransactionResponse {
  span: Span
  children: ChildSpan[]
  hasAnomaly: boolean
  hasError: boolean
  stackTrace: StackTrace
}

export interface Attributes {
  [key: string]: string
}

export interface StackTrace {
  exceptionType: string
  message: string
  stackTrace: string
}

export interface Span {
  id: string
  traceId: string
  parentSpanId: string
  name: string
  serviceName: string
  projectKey: string
  kind: 'SERVER' | 'CLIENT' | 'INTERNAL' | 'PRODUCER' | 'CONSUMER'
  spanType: string
  startEpochMillis: number
  endEpochMillis: number
  duration: number
  startDateTime: string
  data: Attributes
  capacity: number
  totalAddedValues: number
  anomaly: boolean
}

export interface ChildSpan {
  span: Span
  children?: ChildSpan[]
}
