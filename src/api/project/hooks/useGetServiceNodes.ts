import fetcher from '../../fetcher.ts'
import { useSuspenseQuery } from '@tanstack/react-query'

interface GetServiceNodesResponse {
  projectKey: string
  name: string
}

const getServiceNodes = async (projectKey: string): Promise<GetServiceNodesResponse[]> => {
  return await fetcher.get(`/api/v1/projects/${projectKey}/service-nodes`)
}

const useGetServiceNodes = (projectKey: string) => {
  return useSuspenseQuery<GetServiceNodesResponse[], Error>({
    queryKey: ['getServiceNodes', projectKey],
    queryFn: () => getServiceNodes(projectKey)
  })
}

export default useGetServiceNodes
