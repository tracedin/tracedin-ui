import fetcher from '../../fetcher.ts'
import { useQuery } from '@tanstack/react-query'
import { GetTransactionListResponse, PagingKey } from '../schema/GetTransactionListResponse.ts'
import { Dayjs } from 'dayjs'

interface GetTracesProps {
  projectKey: string
  serviceName?: string
  startTime?: Dayjs
  endTime?: Dayjs
  size?: number
  afterKey?: PagingKey
  endPointUrl?: string
}

const datetimeFormatter = 'YYYY-MM-DDTHH:mm:ss'

const getTraces = async (props: GetTracesProps): Promise<GetTransactionListResponse> => {
  return await fetcher.get('/api/v1/spans/traces', {
    params: {
      projectKey: props.projectKey,
      serviceName: props.serviceName,
      startTime: props.startTime?.format(datetimeFormatter),
      endTime: props.endTime?.format(datetimeFormatter),
      size: props.size ?? 10,
      'afterKey[traceId]': props.afterKey?.traceId,
      'afterKey[startEpochMillis]': props.afterKey?.startEpochMillis,
      endPointUrl: props.endPointUrl
    }
  })
}

const useGetTraces = (props: GetTracesProps) => {
  return useQuery<GetTransactionListResponse, Error>({
    queryKey: ['getTraces', props],
    queryFn: () => getTraces(props)
  })
}

export default useGetTraces
