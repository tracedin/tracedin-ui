import React from 'react'
import ReactApexChart from 'react-apexcharts'
import moment from 'moment'
import { ApexOptions } from 'apexcharts'
import { ChildSpan, GetTransactionResponse, Span } from '../api/trace/schema/GetTransactionResponse.ts'
import { openSpanAttributePopup } from './SpanAttributePopup.tsx'

const createSeries = (spans: Span[]) => {
  return [
    {
      data: spans.map(span => ({
        ...span,
        x: span.name,
        y: [span.startEpochMillis, span.endEpochMillis],
        fillColor: getColor(span)
      }))
    }
  ]
}

const getColor = (span: Span) => {
  switch (span.kind) {
    case 'SERVER':
      return '#008FFB'
    case 'CLIENT':
      return '#00E396'
    case 'INTERNAL':
      return '#FF4560'
    case 'PRODUCER':
    case 'CONSUMER':
      return '#D070FB'
    default:
      return '#000'
  }
}

const flatten = (children: ChildSpan[]): Span[] => {
  const flattened: Span[] = []

  for (const child of children) {
    flattened.push(child.span)

    if (child.children) {
      flattened.push(...flatten(child.children))
    }
  }

  return flattened
}

const sortByStartDatetimeAndSpanType = (spans: Span[]): Span[] => {
  const spanTypePriority = {
    HTTP: 1,
    METHOD: 2,
    CLIENT: 3,
    PRODUCER: 4,
    CONSUMER: 5,
    UNKNOWN: 6
  }

  return spans.sort((a, b) => {
    const timeComparison = a.startEpochMillis - b.startEpochMillis
    if (timeComparison !== 0) {
      return timeComparison
    }

    const priorityA = spanTypePriority[a.spanType as keyof typeof spanTypePriority] || 99
    const priorityB = spanTypePriority[b.spanType as keyof typeof spanTypePriority] || 99

    return priorityA - priorityB
  })
}

interface TransactionTimelineComponentProps {
  transactionData: GetTransactionResponse
}

const TransactionTimelineComponent: React.FC<TransactionTimelineComponentProps> = ({ transactionData }) => {
  const { span, children } = transactionData
  const flattenSpans = sortByStartDatetimeAndSpanType([...flatten(children), span])

  const series = createSeries(flattenSpans)

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'rangeBar',
      toolbar: {
        show: false
      },
      events: {
        dataPointSelection: (_event, _chartContext, config) => {
          const span = series[0].data[config.dataPointIndex]
          return openSpanAttributePopup(span)
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
      formatter: (val: number[], opts) => {
        const label = opts.w.globals.labels[opts.dataPointIndex]
        const a = moment(val[0])
        const b = moment(val[1])
        const diff = b.diff(a, 'milliseconds')
        return `${label}: ${diff} ms`
      },
      style: {
        colors: ['#000']
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: (value: string) => {
          return moment(value).format('hh:mm:ss:SSS')
        }
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    }
  }

  return <ReactApexChart options={options} series={series} type="rangeBar" height={350} />
}

export default TransactionTimelineComponent
