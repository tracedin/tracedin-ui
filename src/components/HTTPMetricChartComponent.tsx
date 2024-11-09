import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'
import { GetHTTPRequestsPerHourResponse } from '@/api/metric/schema/GetHTTPRequestsPerHourResponse.ts'

const formatDateTime = (date: moment.Moment) => date.format('M/D HH:mm')

const options: ApexOptions = {
  chart: {
    type: 'area',
    toolbar: {
      show: false
    }
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'category'
  },
  yaxis: {
    title: {
      text: 'TPS'
    }
  },
  tooltip: {
    x: {
      show: true
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 150
        }
      }
    }
  ]
}

interface HTTPMetricChartComponentListProps {
  httpMetricData: GetHTTPRequestsPerHourResponse[] | undefined
}

// 카테고리 추출 함수
const extractCategories = (metrics: GetHTTPRequestsPerHourResponse[]) =>
  metrics.map(it => moment(it.timestamp)).map(it => formatDateTime(it))

// 요청 수 추출 함수
const extractRequestCounts = (metrics: GetHTTPRequestsPerHourResponse[]) => metrics.map(it => it.httpRequestCount)

const HTTPMetricChartComponent: React.FC<HTTPMetricChartComponentListProps> = ({ httpMetricData }) => {
  const [chartOptions] = useState<ApexOptions>(options)
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([])

  options.xaxis!.categories = extractCategories(httpMetricData ?? [])

  useEffect(() => {
    if (httpMetricData) {
      const requestCounts = extractRequestCounts(httpMetricData)

      setSeries([
        {
          name: 'TPS',
          data: requestCounts
        }
      ])
    }
  }, [httpMetricData])

  return (
    <div style={{ overflow: 'hidden' }}>
      <ReactApexChart options={chartOptions} series={series} type="area" height={200} />
    </div>
  )
}

export default HTTPMetricChartComponent
