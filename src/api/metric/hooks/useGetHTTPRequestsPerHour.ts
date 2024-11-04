import fetcher from '../../fetcher.ts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { GetHTTPRequestsPerHourResponse } from '../schema/GetHTTPRequestsPerHourResponse.ts'
import { StatisticsResponse } from '../schema/StatisticsResponse.ts'
import moment from 'moment'
import { REACT_QUERY_REFETECH_INTERVAL } from '@/api/const.ts'

interface GetHTTPRequestsPerHourProps {
  projectKey: string
  name?: string
  endPointUrl?: string
}

const getHTTPRequestsPerHour = async (
  props: GetHTTPRequestsPerHourProps
): Promise<StatisticsResponse<GetHTTPRequestsPerHourResponse[]>> => {
  return await fetcher.get('/api/v1/projects/statistics/HTTP_TPS', {
    params: props
  })
}

const orderByTimestamp = (response: GetHTTPRequestsPerHourResponse[]) =>
  response.sort((a, b) => moment(a.timestamp).diff(moment(b.timestamp)))
const limit15 = (response: GetHTTPRequestsPerHourResponse[]) => response.slice(0, 15)

const useGetHTTPRequestsPerHour = (props: GetHTTPRequestsPerHourProps) => {
  return useSuspenseQuery<
    StatisticsResponse<GetHTTPRequestsPerHourResponse[]>,
    Error,
    GetHTTPRequestsPerHourResponse[]
  >({
    queryKey: ['getHTTPRequest', props],
    queryFn: () => getHTTPRequestsPerHour(props),
    refetchInterval: REACT_QUERY_REFETECH_INTERVAL,
    select: data => orderByTimestamp(limit15(data.statistic))
  })
}

export default useGetHTTPRequestsPerHour
