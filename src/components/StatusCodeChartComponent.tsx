import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { StatusCodeBucket } from '@/api/metric/schema/GetHTTPStatusCodeResponse.ts'

const options: ApexOptions = {
  chart: {
    type: 'pie'
  },
  labels: [],
  colors: ['#2DB400', '#dc3545', '#ffc107'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 500
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
}

interface StatusCodeChartComponentProps {
  statusCodeMetricData: StatusCodeBucket[]
}

const StatusCodeChartComponent: React.FC<StatusCodeChartComponentProps> = ({ statusCodeMetricData }) => {
  const [series] = useState<number[]>(statusCodeMetricData.map(item => item.count))
  const [labels] = useState<string[]>(statusCodeMetricData.map(item => item.statusCode))

  return <ReactApexChart options={{ ...options, labels }} series={series} type="pie" width={500} />
}

export default StatusCodeChartComponent
