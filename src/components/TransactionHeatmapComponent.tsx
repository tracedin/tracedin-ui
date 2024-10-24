import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { EndTimeBucket } from '../api/metric/schema/GetTransactionHeatmapResponse.ts'

const options: ApexOptions = {
  chart: {
    width: 800,
    height: 350,
    type: 'heatmap',
    toolbar: {
      show: false
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {},
    tickAmount: 10
  },
  yaxis: {
    title: {
      text: 'Response Time(ms)'
    },
    labels: {
      show: true
    },
    tickAmount: 5
  },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      radius: 0,
      useFillColorAsStroke: true,
      colorScale: {
        ranges: [
          { from: 0, to: 20, name: 'low', color: '#FFFFA0' },
          { from: 21, to: 50, name: 'medium', color: '#128FD9' },
          { from: 51, to: 80, name: 'high', color: '#FFB200' },
          { from: 81, to: 100, name: 'extreme', color: '#FF0000' }
        ]
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 1
  },
  grid: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  }
}

interface Series {
  name: string
  data: [number, number][]
}

interface TransactionHeatmapComponentProps {
  transactionHeatmapData: EndTimeBucket[]
}

const createSeries = (transactionHeatmapData: EndTimeBucket[]) => {
  const transformedData: Series[] = []

  transactionHeatmapData.forEach(transaction => {
    transaction.responseTimeBuckets.forEach(bucket => {
      const endTime = transaction.endTime
      const responseTimeKey = bucket.responseTime + 'ms'

      let series = transformedData.find(s => s.name === responseTimeKey)
      if (!series) {
        series = { name: responseTimeKey, data: [] }
        transformedData.push(series)
      }

      series.data.push([new Date(endTime).getTime(), bucket.count])
    })
  })

  return transformedData
}

const TransactionHeatmapComponent: React.FC<TransactionHeatmapComponentProps> = ({ transactionHeatmapData }) => {
  const series: Series[] = createSeries(transactionHeatmapData)

  return <ReactApexChart options={options} series={series} type="heatmap" width={1000} height={350} />
}

export default TransactionHeatmapComponent