import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

const options: ApexOptions = {
  chart: {
    height: 350,
    type: 'bar'
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  xaxis: {
    categories: ['CPU', 'Memory', 'I/O', 'GC'],
    labels: {
      style: {
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    min: 0,
    max: 100,
    title: {
      text: 'Percentage (%)'
    }
  }
}

const SystemMetricChartComponent: React.FC = () => {
  const [series, setSeries] = useState([
    {
      name: '사용률',
      data: [70, 50, 80, 30]
    }
  ])

  const generateSeriesDataInterval = () =>
    setInterval(() => {
      setSeries(prevSeries => {
        const newData = prevSeries[0].data.map(() => Math.floor(Math.random() * 101))
        return [{ name: '사용률', data: newData }]
      })
    }, 1000)

  useEffect(() => {
    const interval = generateSeriesDataInterval()
    return () => clearInterval(interval)
  }, [])

  return <ReactApexChart options={options} series={series} type="bar" height={200} />
}

export default SystemMetricChartComponent
