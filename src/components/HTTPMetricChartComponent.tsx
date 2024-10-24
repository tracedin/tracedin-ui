import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'
import {
  GetHTTPRequestsPerHourResponse,
  HTTPRequestPerHourItemResponse
} from '../api/metric/schema/GetHTTPRequestsPerHourResponse.ts'

const formatDateTime = (date: moment.Moment) => date.format('M/D HH:MM')

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
      text: 'Request Count'
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
  httpMetricData: GetHTTPRequestsPerHourResponse | undefined
}

const HTTPMetricChartComponent: React.FC<HTTPMetricChartComponentListProps> = ({ httpMetricData }) => {
  const metrics = httpMetricData?.statistic ?? []

  const extractCategories = (metrics: HTTPRequestPerHourItemResponse[]) =>
    metrics.map(it => moment(it.timestamp)).map(it => formatDateTime(it))

  const extractRequestCounts = (metrics: HTTPRequestPerHourItemResponse[]) => metrics.map(it => it.httpRequestCount)

  const xaxisTooltipFormatter = (selected: number) => {
    const categories = options.xaxis!.categories
    const selectedCategory = categories.find((category: string) => category === categories[selected])
    return formatDateTime(moment(selectedCategory))
  }

  options.xaxis!.categories = extractCategories(metrics)
  options.tooltip!.x!.formatter = xaxisTooltipFormatter

  const series = [
    {
      name: '',
      data: extractRequestCounts(metrics)
    }
  ]

  return (
    <div style={{ overflow: 'hidden' }}>
      <ReactApexChart options={options} series={series} type="area" height={200} />
    </div>
  )
}

export default HTTPMetricChartComponent
