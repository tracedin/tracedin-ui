import VisGraph, { GraphData, GraphEvents, Options } from 'react-vis-graph-wrapper'
import springboot from '@/assets/spring-logo.png'
import kafka from '@/assets/kafka-logo.png'
import h2database from '@/assets/h2-logo.png'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Empty } from 'antd'
import {
  GetNetworkTopologyResponse,
  NodeType,
  TopologyEdge,
  TopologyNode
} from '@/api/trace/schema/GetNetworkToplogyResponse.ts'

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

const TopologyNetworkEmpty: React.FC = () => <Empty description="최근 데이터가 존재하지 않습니다" />

interface TopologyNetworkComponentProps {
  networkTopologyData: GetNetworkTopologyResponse | undefined
  setServiceName: Dispatch<SetStateAction<string | undefined>>
}

const TopologyNetworkComponent: React.FC<TopologyNetworkComponentProps> = ({ networkTopologyData, setServiceName }) => {
  const applyImage = (type: NodeType) => {
    const imageMap = {
      [NodeType.SERVICE]: springboot,
      [NodeType.DATABASE]: h2database,
      [NodeType.KAFKA]: kafka
    }

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

  const isServiceNode = (serviceName: string) => {
    //FIXME 서비스 노드 조건 수정필요
    return graph.nodes.find(node => node.id == serviceName)?.image === springboot
  }

  const isEmpty = (graph: GraphData) => {
    return !graph.nodes.length && !graph.edges.length
  }

  const events: GraphEvents = {
    select: function (event) {
      const { nodes } = event

      if (isServiceNode(nodes[0])) {
        setServiceName(nodes[0])
      }
    }
  }

  return isEmpty(graph) ? <TopologyNetworkEmpty /> : <VisGraph graph={graph} options={options} events={events} />
}

export default TopologyNetworkComponent
