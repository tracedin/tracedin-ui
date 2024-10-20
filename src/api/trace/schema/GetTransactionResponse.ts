export interface GetTransactionResponse {
  span: Span
  children: ChildSpan[]
}

export interface Attributes {
  [key: string]: string
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
}

export interface ChildSpan {
  span: Span
  children?: ChildSpan[]
}
