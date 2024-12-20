import { useEffect, useState } from 'react'

interface SystemMetricStreamProps {
  projectKey: string
  serviceName?: string
}

export interface SystemMetricStream {
  name: string
  unit: 'percent' | '1'
  value: number
}

const useSystemMetricStream = ({ projectKey, serviceName }: SystemMetricStreamProps) => {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetricStream[]>([])

  useEffect(() => {
    let url = `${import.meta.env.VITE_TRACEDIN_API}/api/v1/service-metrics/subscribe?projectKey=${projectKey}`
    if (serviceName) {
      url = `${url}&serviceName=${serviceName}`
    }

    const eventSource = new EventSource(url)

    eventSource.addEventListener('tracedin-client - metrics', event => {
      setSystemMetrics(JSON.parse(event.data))
    })

    eventSource.onerror = error => {
      console.error('EventSource failed:', error)
    }

    return () => {
      eventSource.close()
    }
  }, [projectKey, serviceName])

  return systemMetrics
}

export default useSystemMetricStream
