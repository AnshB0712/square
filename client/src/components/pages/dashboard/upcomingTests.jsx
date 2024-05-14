import useTestsStudent from "../../../hooks/query/useTestsStudent";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "../../ui/button";
import { Link } from "react-router-dom";
import { CarouselDots } from "../../ui/carousel";

const UpcomingTests = () => {
  const { data } = useTestsStudent();
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
          );
        })}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  );
};

export default UpcomingTests;
