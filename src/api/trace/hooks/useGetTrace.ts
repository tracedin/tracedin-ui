import fetcher from '../../fetcher.ts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { GetTransactionResponse } from '../schema/GetTransactionResponse.ts'

const getTrace = async (traceId: string): Promise<GetTransactionResponse> => {
  return await fetcher.get(`/api/v1/spans/span-tree?traceId=${traceId}`)
}

const useGetTrace = (traceId: string) => {
  return useSuspenseQuery<GetTransactionResponse, Error>({
    queryKey: ['getTrace', traceId],
    queryFn: () => getTrace(traceId)
  })
}

export default useGetTrace
