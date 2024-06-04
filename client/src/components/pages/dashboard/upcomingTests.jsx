import useTestsStudent from "../../../hooks/query/useTestsStudent"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "../../ui/button"
import { Link } from "react-router-dom"
import { CarouselDots } from "../../ui/carousel"

const UpcomingTests = () => {
  const { data } = useTestsStudent()

  if (!data?.data?.data?.length)
    return (
      <div className="w-full overflow-scroll flex items-center gap-2">
        <Card className="sm:col-span-2 max-w-full bg-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-center font-medium">
              No Test is listed as of yet.
            </CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed text-center">
              This section will show all the test assigned to your class by the
              Teacher.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Empty
            </Button>
          </CardFooter>
        </Card>
      </div>
    )

  return (
    <Carousel>
      <CarouselContent>
        {data?.data?.data?.map((test, i) => {
          return (
            <CarouselItem key={i}>
              <Card className="w-full max-w-[360px] bg-muted">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex justify-between">
                    {test.name}

                    <Badge variant="outline" className="bg-white">
                      {new Intl.DateTimeFormat("en-GB", {
                        dateStyle: "full",
                        timeZone: "Asia/Kolkata",
                      }).format(new Date(test.on))}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="w-full text-balance leading-relaxed">
                    Quick Test Section to keep up with your Preparations and be
                    ahead in the game.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link
                    to={`/view/test/${test._id}?role=student`}
                    className={`${buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })} w-full`}
                  >
                    View Test Syllabus
                  </Link>
                </CardFooter>
              </Card>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
}

export default UpcomingTests
