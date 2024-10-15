import fetcher from '../../fetcher.ts'
import { useQuery } from '@tanstack/react-query'
import { GetHTTPRequestsPerHourResponse } from '../schema/GetHTTPRequestsPerHourResponse.ts'

interface GetHTTPRequestsPerHourProps {
  projectKey: string
  name: string
}

const getHTTPRequestsPerHour = async (
  props: GetHTTPRequestsPerHourProps
): Promise<GetHTTPRequestsPerHourResponse[]> => {
  return await fetcher.get(`/api/v1/metrics/http-request-count?projectKey=${props.projectKey}&name=${props.name}`)
}

const useGetHTTPRequestsPerHour = (props: GetHTTPRequestsPerHourProps) => {
  return useQuery<GetHTTPRequestsPerHourResponse[], Error>({
    queryKey: ['getHTTPRequest', props.name],
    queryFn: () => getHTTPRequestsPerHour(props)
  })
}

export default useGetHTTPRequestsPerHour
