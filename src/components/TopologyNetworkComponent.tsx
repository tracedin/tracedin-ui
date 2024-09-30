import VisGraph, { GraphData, GraphEvents, Options } from 'react-vis-graph-wrapper'
import springboot from '@/assets/spring-logo.png'
import kafka from '@/assets/kafka-logo.png'
import h2database from '@/assets/h2-logo.png'
import chatgpt from '@/assets/chatgpt-logo.png'
import { useEffect, useState } from 'react'

const graphData: GraphData = {
  nodes: [
    { id: 1, label: 'Hello Server', title: 'node 1 tootip text', image: springboot },
    { id: 2, label: 'World Server', title: 'node 2 tootip text', image: springboot },
    { id: 3, label: 'Apache Kafka', title: 'node 3 tootip text', image: kafka },
    { id: 4, label: 'H2 Database', title: 'node 4 tootip text', image: h2database },
    { id: 5, label: 'ChatGPT', title: 'node 5 tootip text', image: chatgpt }
  ],
  edges: [
    { from: 1, to: 2, label: '20' },
    { from: 1, to: 3, label: '4' },
    { from: 2, to: 4, label: '3' },
    { from: 2, to: 5, label: '10' }
  ]
}

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
  width: '500px',
  height: '500px'
}

const events: GraphEvents = {
  select: function (event) {
    const { nodes } = event
    alert(nodes)
  }
}

export default function TopologyNetworkComponent() {
  const [graph, setGraph] = useState<GraphData>(graphData)

  useEffect(() => {
    const timer = setTimeout(() => {
      const newNode = { id: 6, label: 'New Server', title: 'New node tooltip', image: springboot }
      const newEdge = { from: 2, to: 6, label: '100' }

      setGraph(prevGraph => ({
        nodes: [...prevGraph.nodes, newNode],
        edges: [...prevGraph.edges, newEdge]
      }))
    }, 3000)

    const labelChangeInterval = setInterval(() => {
      setGraph(prevGraph => {
        const newEdges = prevGraph.edges.map(edge => ({
          ...edge,
          label: String(Math.floor(Math.random() * 100) + 1)
        }))

        return { ...prevGraph, edges: newEdges }
      })
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(labelChangeInterval)
    }
  }, [])

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
