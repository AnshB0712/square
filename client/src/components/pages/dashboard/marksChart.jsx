import { AreaChart } from '@tremor/react'
import useGetPerformanceData from '../../../hooks/query/useGetPerformanceData'
import { Loading } from '../../layout/loading'
import Error from '../../layout/pageNotFound'
import { Link } from 'react-router-dom'
import { buttonVariants } from '../../ui/button'

const isLatestMarksLessThenHighest = (data) => {
  if (!data || !Array.isArray(data)) return true

  const MAX_PERCENTAGE = Math.max(...data.map((val) => val.percentage))
  const latestPercentage = data[data.length - 1]['percentage']

  return MAX_PERCENTAGE > latestPercentage
}

const tooltip = (props) => {
  const { payload, active } = props
  if (!active || !payload) return null
  return (
    <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown z-50 pointer-events-auto">
      {payload.map((category, idx) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div
            className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
          />
          <div className="flex flex-col min-w-[90%]">
            <div className="space-y-.5">
              <p className="text-tremor-content capitalize">Test-on</p>
              <p className="font-medium text-tremor-content-emphasis">
                {`${new Intl.DateTimeFormat('en-GB', {
                  dateStyle: 'full',
                  timeZone: 'Asia/Kolkata',
                }).format(new Date(category.payload.on))}`}
              </p>
            </div>
            <div className="space-y-.5">
              <p className="text-tremor-content capitalize">
                {category.dataKey}
              </p>
              <p className="font-medium text-tremor-content-emphasis">
                {category.value}%
              </p>
            </div>
            <Link
              to={`/marks/test/${category.payload._id}/subject/${category.payload.subject}`}
              className={`${buttonVariants({
                variant: 'outline',
                size: 'sm',
              })}`}
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

const MarksChart = ({ value }) => {
  const { data, isLoading, isError } = useGetPerformanceData({
    subjectId: value,
  })

  if (isError) {
    return <Error />
  }

  if (isLoading)
    return (
      <div className="w-full h-80">
        <Loading />
      </div>
    )

  return (
    <>
      <AreaChart
        className="h-80"
        data={data?.data?.data}
        maxValue={100}
        minValue={0}
        index="on"
        categories={['percentage']}
        colors={
          isLatestMarksLessThenHighest(data?.data?.data) ? ['red'] : ['green']
        }
        valueFormatter={(number) => `${number}%`}
        yAxisWidth={35}
        showXAxis={false}
        customTooltip={tooltip}
      />
    </>
  )
}

export default MarksChart
