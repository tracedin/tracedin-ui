import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { EndTimeBucket } from '@/api/metric/schema/GetTransactionHeatmapResponse.ts'
import moment from 'moment'

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
    labels: {
      format: 'MM/dd HH:mm'
    }
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
          { from: 0, to: 0, name: 'none', color: '#FFFFFF' },
          { from: 1, to: 20, name: 'low', color: '#CCFF66' },
          { from: 21, to: 50, name: 'medium', color: '#128FD9' },
          { from: 51, to: 400, name: 'high', color: '#FFB200' },
          { from: 400, to: 100000, name: 'extreme', color: '#FF0000' }
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
  data: { x: number; y: number }[]
}

interface TransactionHeatmapComponentProps {
  transactionHeatmapData: EndTimeBucket[]
}

const createSeries = (transactionHeatmapData: EndTimeBucket[]) => {
  const transformedData: Series[] = []

  const responseTimes = Array.from({ length: 21 }, (_, index) => index * 100)

  responseTimes.forEach(time => {
    const responseTimeKey = time + 'ms'
    const series = { name: responseTimeKey, data: [] }
    transformedData.push(series)
  })

  const referenceBuckets = transactionHeatmapData[0]?.responseTimeBuckets || []
  const maxBucketsCount = referenceBuckets.length

  transactionHeatmapData.forEach(transaction => {
    const endTime = transaction.endTime
    const koreaTime = moment.utc(endTime).add(9, 'hours').valueOf()

    responseTimes.forEach(time => {
      const responseTimeKey = time + 'ms'
      const series = transformedData.find(s => s.name === responseTimeKey)

      const bucket = transaction.responseTimeBuckets.find(bucket => bucket.responseTime === time)

      if (series) {
        series.data.push({
          x: koreaTime,
          y: bucket ? bucket.count : 0
        })
      }
    })
  })

  transformedData.forEach(series => {
    const missingDataCount = maxBucketsCount - series.data.length

    for (let i = 0; i < missingDataCount; i++) {
      series.data.push({
        x: 0,
        y: 0
      })
    }
  })

  return transformedData
}

const TransactionHeatmapComponent: React.FC<TransactionHeatmapComponentProps> = ({ transactionHeatmapData }) => {
  const series: Series[] = createSeries(transactionHeatmapData)

  return <ReactApexChart options={options} series={series} type="heatmap" width={1000} height={350} />
}

export default TransactionHeatmapComponent
