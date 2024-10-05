import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'

const HTTPMetricChartComponent: React.FC = () => {
  const fiveHoursAgo = moment().subtract(5, 'hours')

  const categories = Array.from({ length: 6 }, (_, index) => {
    return fiveHoursAgo.clone().add(index, 'hours')
  })

  const formatDateTime = (date: moment.Moment) => date.format('M/D HH:00')
  const formatSeriesDate = (date: moment.Moment) => date.format('M/D')

  const formattedCategories = categories.map(date => formatDateTime(date))

  const series = [
    {
      name: formatSeriesDate(moment().subtract(1, 'days')),
      data: [310, 400, 280, 510, 420, 1090]
    },
    {
      name: formatSeriesDate(moment()),
      data: [110, 320, 450, 320, 340, 520]
    }
  ]

  const options: ApexOptions = {
    chart: {
      height: 200,
      type: 'area',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'category',
      categories: formattedCategories
    },
    yaxis: {
      title: {
        text: 'Response Time (ms)'
      }
    },
    tooltip: {
      x: {
        formatter: value => {
          const index = formattedCategories.findIndex((_, idx) => idx === value)
          const date = categories[index]
          return formatDateTime(date)
        }
      }
    },
    grid: {
      padding: {
        left: 0,
        right: 0
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

  return (
    <div style={{ overflow: 'hidden' }}>
      <ReactApexChart options={options} series={series} type="area" height={200} />
    </div>
  )
}

export default HTTPMetricChartComponent
