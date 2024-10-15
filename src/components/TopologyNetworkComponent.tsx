import VisGraph, { GraphData, GraphEvents, Options } from 'react-vis-graph-wrapper'
import springboot from '@/assets/spring-logo.png'
import kafka from '@/assets/kafka-logo.png'
import h2database from '@/assets/h2-logo.png'
import React, { useState } from 'react'
import {
  GetNetworkTopologyResponse,
  NodeType,
  TopologyEdge,
  TopologyNode
} from '../api/trace/schema/GetNetworkToplogyResponse.ts'

const options: Options = {
  nodes: {
    shape: 'image',
    size: 30
  },
  edges: {
    color: '#000000',
    length: 300,
    arrows: {
      to: { enabled: false },
      from: { enabled: false }
    }
  },
  width: '100%',
  height: '500px'
}

const events: GraphEvents = {
  select: function(event) {
    const { nodes } = event
    alert(nodes)
  }
}

interface TopologyNetworkComponentProps {
  networkTopologyData: GetNetworkTopologyResponse | undefined
}

const TopologyNetworkComponent: React.FC<TopologyNetworkComponentProps> = ({ networkTopologyData }) => {
  const applyImage = (type: NodeType) => {
    const imageMap = {
      [NodeType.SERVICE]: springboot,
      [NodeType.DATABASE]: h2database,
      [NodeType.KAFKA]: kafka,
    };

    return imageMap[type] || springboot
  }

  const setupGraph = (serviceNodes: TopologyNode[], serviceEdges: TopologyEdge[]): GraphData => {
    const nodes = serviceNodes.map(it => ({ id: it.name, label: it.name, image: applyImage(it.nodeType) }))
    const edges = serviceEdges.map(it => ({ from: it.source, to: it.target, label: String(it.requestCount) }))

    return { nodes, edges }
  }

  const serviceNodes = networkTopologyData?.nodes ?? []
  const serviceEdges = networkTopologyData?.edges ?? []

  const [graph] = useState<GraphData>(setupGraph(serviceNodes, serviceEdges))

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
