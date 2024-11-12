export interface GetTransactionListResponse {
  results: TransactionListItemResponse[]
  afterKey: PagingKey
  totalCount: number
}

export interface TransactionListItemResponse {
  traceId: string
  endPoint: string
  serviceName: string
  statusCode: number
  startEpochMillis: number
  endEpochMillis: number
  duration: number
  startDateTime: string
  isAnomaly: boolean
}

export interface PagingKey {
  traceId: string
  startEpochMillis: number
}
