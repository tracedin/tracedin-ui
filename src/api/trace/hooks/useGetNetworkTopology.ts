import fetcher from '../../fetcher.ts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { GetNetworkTopologyResponse } from '../schema/GetNetworkToplogyResponse.ts'

const getNetworkTopology = async (projectKey: string): Promise<GetNetworkTopologyResponse> => {
  return await fetcher.get(`/api/v1/projects/${projectKey}/network-topology`)
}

const useGetNetworkTopology = (projectKey: string) => {
  return useSuspenseQuery<GetNetworkTopologyResponse, Error>({
    queryKey: ['getNetworkTopology', projectKey],
    queryFn: () => getNetworkTopology(projectKey)
  })
}

export default useGetNetworkTopology
