import fetcher from '../../fetcher.ts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { GetHTTPRequestsPerHourResponse } from '../schema/GetHTTPRequestsPerHourResponse.ts'

interface GetHTTPRequestsPerHourProps {
  projectKey: string
  name: string
}

const getHTTPRequestsPerHour = async (props: GetHTTPRequestsPerHourProps): Promise<GetHTTPRequestsPerHourResponse> => {
  return await fetcher.get(`/api/v1/projects/statistics/HTTP_TPS?projectKey=${props.projectKey}&name=${props.name}`)
}

const useGetHTTPRequestsPerHour = (props: GetHTTPRequestsPerHourProps) => {
  return useSuspenseQuery<GetHTTPRequestsPerHourResponse, Error>({
    queryKey: ['getHTTPRequest', props.name],
    queryFn: () => getHTTPRequestsPerHour(props)
  })
}

export default useGetHTTPRequestsPerHour
