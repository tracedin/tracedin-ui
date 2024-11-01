export interface GetHTTPStatusCodeResponse {
  statusCodeBuckets: StatusCodeBucket[]
}

export interface StatusCodeBucket {
  statusCode: string
  count: number
}
