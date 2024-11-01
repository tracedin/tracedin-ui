import fetcher from '../../fetcher.ts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { StatisticsResponse } from '../schema/StatisticsResponse.ts'
import { GetHTTPStatusCodeResponse, StatusCodeBucket } from '../schema/GetHTTPStatusCodeResponse.ts'

interface useGetHTTPStatusCodeDistributionProp {
  projectKey: string
  serviceName?: string
  endPointUrl?: string
}

const getHTTPStatusCodeDistribution = async (
  props: useGetHTTPStatusCodeDistributionProp
): Promise<StatisticsResponse<GetHTTPStatusCodeResponse>> => {
  return await fetcher.get('/api/v1/projects/statistics/STATUS_CODE', {
    params: props
  })
}

const useGetHTTPStatusCodeDistribution = (props: useGetHTTPStatusCodeDistributionProp) => {
  return useSuspenseQuery<StatisticsResponse<GetHTTPStatusCodeResponse>, Error, StatusCodeBucket[]>({
    queryKey: ['getHTTPStatusCode', props],
    queryFn: () => getHTTPStatusCodeDistribution(props),
    select: data => data.statistic.statusCodeBuckets
  })
}

export default useGetHTTPStatusCodeDistribution
