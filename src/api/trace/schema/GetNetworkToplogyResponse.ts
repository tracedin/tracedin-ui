export interface GetNetworkTopologyResponse {
  serviceNodes: TopologyNode[]
  edges: TopologyEdge[]
}

export interface TopologyEdge {
  source: string
  target: string
  requestCount: number
}

export interface TopologyNode {
  projectKey: string
  name: string
}
