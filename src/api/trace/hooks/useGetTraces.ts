import fetcher from '../../fetcher.ts'
import { useQuery } from '@tanstack/react-query'
import { GetTransactionListResponse } from '../schema/GetTransactionListResponse.ts'

interface GetTracesProps {
  projectKey: string
  serviceName: string
  size?: number
}

const getTraces = async (props: GetTracesProps): Promise<GetTransactionListResponse> => {
  return await fetcher.get('/api/v1/spans/traces', {
    params: {
      projectKey: props.projectKey,
      serviceName: props.serviceName,
      size: props.size ?? 5
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
