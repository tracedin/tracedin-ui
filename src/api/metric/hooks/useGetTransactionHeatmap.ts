import fetcher from '../../fetcher.ts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { EndTimeBucket, GetTransactionHeatmapResponse } from '../schema/GetTransactionHeatmapResponse.ts'
import { StatisticsResponse } from '../schema/StatisticsResponse.ts'

interface GetTransactionHeatmapProps {
  projectKey: string
  serviceName?: string
}

const getTransactionHeatmap = async (
  props: GetTransactionHeatmapProps
): Promise<StatisticsResponse<GetTransactionHeatmapResponse>> => {
  return await fetcher.get(`/api/v1/projects/statistics/TRACE_HIT_MAP`, {
    params: props
  })
}

const useGetTransactionHeatmap = (props: GetTransactionHeatmapProps) => {
  return useSuspenseQuery<StatisticsResponse<GetTransactionHeatmapResponse>, Error, EndTimeBucket[]>({
    queryKey: ['getTransactionHeatmap', props],
    queryFn: () => getTransactionHeatmap(props),
    select: data => data.statistic.endTimeBuckets
  })
}

export default useGetTransactionHeatmap
