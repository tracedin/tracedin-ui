import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { SystemMetricStream } from '../api/metric/hooks/useSystemMetricStream.ts'

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
    categories: ['Memory', 'Heap', 'CPU', 'Disk'],
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

interface SystemMetricChartComponentProp {
  systemMetricData: SystemMetricStream[]
}

const SystemMetricChartComponent: React.FC<SystemMetricChartComponentProp> = ({ systemMetricData }) => {
  const [series, setSeries] = useState<ApexAxisChartSeries>([])

  useEffect(() => {
    setSeries([
      {
        name: '사용률',
        data: (systemMetricData ?? []).filter(it => it.unit === 'percent').map(it => Math.ceil(it.value))
      }
    ])
  }, [systemMetricData])

  return <ReactApexChart options={options} series={series} type="bar" height={200} />
}

export default SystemMetricChartComponent
