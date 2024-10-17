export interface GetNetworkTopologyResponse {
  nodes: TopologyNode[]
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
  nodeType: NodeType
}

export enum NodeType {
  SERVICE = 'SERVICE',
  KAFKA = 'KAFKA',
  DATABASE = 'DATABASE'
}
