import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'
import { Loading } from '../../layout/loading'
import { BarChart4 } from 'lucide-react'
import MarksChart from './marksChart'
import useGetEnrolledSubjects from '../../../hooks/query/useGetEnrolledSubjects'
import { useEffect, useState } from 'react'

const StudentPerformanceGraph = ({ subjectId }) => {
  const { data: enrolledSubjects, isLoading: enrolledSubjectsLoading } =
    useGetEnrolledSubjects()
  const [value, setValue] = useState(() => subjectId || '')

  useEffect(() => {
    if (enrolledSubjects) {
      setValue(enrolledSubjects.data.data[0]._id)
    }
  }, [enrolledSubjects])

  return (
    <>
      <article className=" flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <BarChart4 className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-sm mb-[2px] font-medium flex items-center md:text-2xl">
            Performance Graph
          </h1>
          <Select
            value={value}
            onValueChange={(e) => setValue(e)}
            disabled={!!subjectId}
          >
            <SelectTrigger className="w-18  ml-auto">
              <SelectValue placeholder="Subjects" />
            </SelectTrigger>
            <SelectContent>
              {enrolledSubjectsLoading ? (
                <Loading />
              ) : (
                enrolledSubjects?.data?.data?.map((subject) => (
                  <SelectItem key={subject._id} value={subject._id}>
                    {subject.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <MarksChart value={subjectId || value} />
        </div>
      </article>
    </>
  )
}

export default StudentPerformanceGraph
