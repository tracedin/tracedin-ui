import fetcher from '../../fetcher.ts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { GetHTTPRequestsPerHourResponse } from '../schema/GetHTTPRequestsPerHourResponse.ts'
import { StatisticsResponse } from '../schema/StatisticsResponse.ts'

interface GetHTTPRequestsPerHourProps {
  projectKey: string
  name: string
}

const getHTTPRequestsPerHour = async (
  props: GetHTTPRequestsPerHourProps
): Promise<StatisticsResponse<GetHTTPRequestsPerHourResponse[]>> => {
  return await fetcher.get(`/api/v1/projects/statistics/HTTP_TPS?projectKey=${props.projectKey}&name=${props.name}`)
}

const useGetHTTPRequestsPerHour = (props: GetHTTPRequestsPerHourProps) => {
  return useSuspenseQuery<
    StatisticsResponse<GetHTTPRequestsPerHourResponse[]>,
    Error,
    GetHTTPRequestsPerHourResponse[]
  >({
    queryKey: ['getHTTPRequest', props.name],
    queryFn: () => getHTTPRequestsPerHour(props),
    select: data => data.statistic
  })
}

export default useGetHTTPRequestsPerHour
