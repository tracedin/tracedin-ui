export interface GetHTTPRequestsPerHourResponse {
  statistic: HTTPRequestPerHourItemResponse[]
  statisticsType: string
}

export interface HTTPRequestPerHourItemResponse {
  timestamp: string
  httpRequestCount: number
}
