import fetcher from '../../fetcher.ts'
import { useQuery } from '@tanstack/react-query'
import { GetNetworkTopologyResponse } from '../schema/GetNetworkToplogyResponse.ts'

const getNetworkTopology = async (projectKey: string): Promise<GetNetworkTopologyResponse> => {
  return await fetcher.get(`/api/v1/projects/${projectKey}/network-topology`)
}

const useGetNetworkTopology = (projectKey: string) => {
  return useQuery<GetNetworkTopologyResponse, Error>({
    queryKey: ['getNetworkTopology', projectKey],
    queryFn: () => getNetworkTopology(projectKey)
  })
}

export default useGetNetworkTopology
