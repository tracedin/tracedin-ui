import VisGraph, { GraphData, GraphEvents, Options } from 'react-vis-graph-wrapper'
import springboot from '@/assets/spring-logo.png'
import React, { useState } from 'react'
import {
  GetNetworkTopologyResponse,
  TopologyEdge,
  TopologyNode
} from '../api/trace/schema/GetNetworkToplogyResponse.ts'

const options: Options = {
  nodes: {
    shape: 'image'
  },
  edges: {
    color: '#000000',
    arrows: {
      to: { enabled: false },
      from: { enabled: false }
    }
  },
  width: '100%',
  height: '500px'
}

const events: GraphEvents = {
  select: function (event) {
    const { nodes } = event
    alert(nodes)
  }
}

interface TopologyNetworkComponentProps {
  networkTopologyData: GetNetworkTopologyResponse | undefined
}

const TopologyNetworkComponent: React.FC<TopologyNetworkComponentProps> = ({ networkTopologyData }) => {
  const setupGraph = (serviceNames: string[], serviceEdges: TopologyEdge[]): GraphData => {
    const nodes = serviceNames.map(it => ({ id: it, label: it, image: springboot }))
    const edges = serviceEdges.map(it => ({ from: it.source, to: it.target, label: String(it.requestCount) }))

    return { nodes, edges }
  }

  const serviceNames = (networkTopologyData?.serviceNodes ?? []).map((it: TopologyNode) => it.name)
  const serviceEdges = networkTopologyData?.edges ?? []

  const [graph] = useState<GraphData>(setupGraph(serviceNames, serviceEdges))

  return (
    <VisGraph
      graph={graph}
      options={options}
      events={events}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getNetwork={(network: any) => {
        console.log(network)
      }}
    />
  )
}

export default TopologyNetworkComponent
