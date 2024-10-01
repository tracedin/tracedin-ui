import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

const options: ApexOptions = {
  chart: {
    height: 350,
    type: 'scatter',
    zoom: {
      enabled: false
    }
  },
  grid: {
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  colors: ['#33FF57', '#FF5733'],
  dataLabels: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeUTC: false
    }
  },
  yaxis: {
    min: 0
  },
  markers: {
    shape: ['circle'],
    size: 5,
    fillOpacity: 0.8,
    strokeColors: '#333'
  }
}

interface SeriesData {
  name: string
  data: number[][] // [timestamp, value]
}

const generateRealTimeData = (count: number, { min, max }: { min: number; max: number }) => {
  return Array.from({ length: count }, () => {
    const value = Math.floor(Math.random() * (max - min + 1)) + min
    const statusCode = Math.floor(Math.random() * 500)
    return { value, statusCode }
  })
}

const generateSeriesData = (data: { value: number; statusCode: number }[], now: number): SeriesData[] => {
  const startTime = now - 10 * 1000 // 10초 전의 시간

  const successData = data
    .filter(item => item.statusCode >= 200 && item.statusCode < 400)
    .map((item, index) => [
      startTime + index * ((10 * 1000) / (data.length - 1)), // 데이터 개수에 따라 분배
      item.value
    ])

  const errorData = data
    .filter(item => item.statusCode >= 400)
    .map((item, index) => [startTime + index * ((10 * 1000) / (data.length - 1)), item.value])

  return [
    {
      name: 'SUCCESS',
      data: successData
    },
    {
      name: 'ERROR',
      data: errorData
    }
  ]
}

const RealTimeTransactionComponent: React.FC = () => {
  const [data, setData] = useState(() => generateRealTimeData(5, { min: 10, max: 1000 }))
  const [series, setSeries] = useState<SeriesData[]>(generateSeriesData(data, Date.now()))

  const generateSeriesDataInterval = () =>
    setInterval(() => {
      const now = Date.now()
      const newData = generateRealTimeData(1, { min: 10, max: 500 })
      setData(prevData => {
        const updatedData = [...prevData, ...newData]

        const validSeries = generateSeriesData(updatedData, now)
        options.xaxis!.min = now - 10 * 1000
        options.xaxis!.max = now

        setSeries(validSeries)
        return updatedData
      })
    }, 1000)

  useEffect(() => {
    const interval = generateSeriesDataInterval()
    return () => clearInterval(interval)
  }, [])

  return <ReactApexChart options={options} series={series} type="scatter" height={500} width={1000} />
}

export default RealTimeTransactionComponent
