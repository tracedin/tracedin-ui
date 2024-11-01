import fetcher from '../../fetcher.ts'
import { useSuspenseQuery } from '@tanstack/react-query'

interface GetTracesProps {
  projectKey: string
  serviceName?: string
}

const getServiceEndpoints = async (props: GetTracesProps): Promise<string[]> => {
  return await fetcher.get('/api/v1/projects/service-endpoints', {
    params: {
      projectKey: props.projectKey,
      serviceName: props.serviceName
    }
  })
}

const useGetServiceEndpoints = (props: GetTracesProps) => {
  return useSuspenseQuery<string[], Error>({
    queryKey: ['getServiceEndpoints', props],
    queryFn: () => getServiceEndpoints(props)
  })
}

export default useGetServiceEndpoints
