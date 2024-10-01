import React from 'react'
import ReactApexChart from 'react-apexcharts'
import moment from 'moment'
import { ApexOptions } from 'apexcharts'

const series = [
  {
    data: [
      {
        x: 'GET http://localhost:8080/hello',
        y: [new Date('2024-10-04T14:10:10.000').getTime(), new Date('2024-10-04T14:10:11.000').getTime()],
        fillColor: '#008FFB'
      },
      {
        x: 'HelloApi.getHello(String key, String value)',
        y: [new Date('2024-10-04T14:10:10.100').getTime(), new Date('2024-10-04T14:10:10.900').getTime()],
        fillColor: '#00E396'
      },
      {
        x: 'ServiceClient.hello()',
        y: [new Date('2024-10-04T14:10:10.200').getTime(), new Date('2024-10-04T14:10:10.600').getTime()],
        fillColor: '#00E396'
      },
      {
        x: 'HelloApi.hello()',
        y: [new Date('2024-10-04T14:10:10.250').getTime(), new Date('2024-10-04T14:10:10.400').getTime()],
        fillColor: '#00E396'
      },
      {
        x: 'HelloApiRepository.hello()',
        y: [new Date('2024-10-04T14:10:10.400').getTime(), new Date('2024-10-04T14:10:10.600').getTime()],
        fillColor: '#FF4560'
      }
    ]
  }
]

const options: ApexOptions = {
  chart: {
    height: 350,
    type: 'rangeBar',
    toolbar: {
      show: false
    },
    events: {
      dataPointSelection: (_event, _chartContext, config) => {
        const label = series[0].data[config.dataPointIndex].x
        alert(`Clicked on: ${label}`)
      }
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      distributed: true,
      dataLabels: {
        hideOverflowingLabels: false
      }
    }
  },
  dataLabels: {
    enabled: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: function (val: number[], opts: any) {
      const label = opts.w.globals.labels[opts.dataPointIndex]
      const a = moment(val[0])
      const b = moment(val[1])
      const diff = b.diff(a, 'milliseconds')
      return `${label}: ${diff} ms`
    },
    style: {
      colors: ['#f3f4f5', '#fff']
    }
  },
  xaxis: {
    type: 'datetime',
    min: new Date('2024-10-04T14:10:10').getTime(),
    max: new Date('2024-10-04T14:10:11').getTime(),
    labels: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    row: {
      colors: ['#f3f4f5', '#fff'],
      opacity: 1
    }
  }
}

const TransactionTimelineComponent: React.FC = () => {
  return <ReactApexChart options={options} series={series} type="rangeBar" height={350} />
}

export default TransactionTimelineComponent
