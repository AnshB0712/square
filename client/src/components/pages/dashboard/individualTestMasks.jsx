import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '../../ui/button'
import { Link, useParams } from 'react-router-dom'
import useIndividualTestMark from '../../../hooks/query/useIndividualTestMark'
import StudentPerformanceGraph from './studentPerformanceGraph'
import { Loading } from '../../layout/loading'
import CustomErrorBoundary from '../../layout/errorBoundary'

const IndividualTestMarks = () => {
  const { testId, subjectId } = useParams()
  const { data, isLoading } = useIndividualTestMark({ testId })

  if (isLoading) return <Loading />

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription className="flex justify-between items-center">
            <p className="text-md text-muted-foreground">This Test </p>
            <Badge variant={'outline'}>
              {data?.data?.data?.[0]?.subject?.name}
            </Badge>
          </CardDescription>
          <CardTitle className="text-3xl text-center">
            {data?.data?.data?.[0]?.percentage}%
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-accent-foreground text-center">
            Total from Out-Of:
            <strong>
              {data?.data?.data?.[0]?.marks} / {data?.data?.data?.[0]?.total}
            </strong>
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={data?.data?.data?.[0]?.percentage} />
        </CardFooter>
      </Card>

      <CustomErrorBoundary>
        <StudentPerformanceGraph subjectId={subjectId} />
      </CustomErrorBoundary>

      <Link
        to="/dashboard"
        className={`${buttonVariants({
          size: 'lg',
        })} w-full`}
      >
        Go to Home
      </Link>
    </div>
  )
}

export default IndividualTestMarks
