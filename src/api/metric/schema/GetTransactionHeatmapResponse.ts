export interface GetTransactionHeatmapResponse {
  endTimeBuckets: EndTimeBucket[]
}

export interface EndTimeBucket {
  endTime: string
  errorCount: number
  responseTimeBuckets: ResponseTimeBucket[]
}

interface ResponseTimeBucket {
  responseTime: number
  count: number
}
