import { Command, Newspaper } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import RecentTests from "./RecentTests";
import { buttonVariants } from "../../ui/button";

const Dashboard = () => {
  return (
    <>
      <article className=" flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <Command className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-sm mb-[2px] font-medium flex items-center md:text-2xl">
            Actions
          </h1>
        </div>
        <div className="w-full overflow-scroll flex items-center gap-2">
          <Card className="sm:col-span-2 min-w-[90%]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Register Student
              </CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Register new student to your classes with standard he/she will
                be taking.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link
                to="/student/new"
                className={buttonVariants({ variabt: "default:" })}
              >
                Add New Student
              </Link>
            </CardFooter>
          </Card>
          <Card className="sm:col-span-2 min-w-[90%]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Register Teacher
              </CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Register new teacher to your classes with standards he/she will
                be taking.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link
                to="/teacher/new"
                className={buttonVariants({ variabt: "default:" })}
              >
                Add New Teacher
              </Link>
            </CardFooter>
          </Card>
        </div>
      </article>
      <br />
      <article className=" flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <Newspaper className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-sm mb-[2px] font-medium flex items-center md:text-2xl">
            Test
          </h1>
        </div>
        <div className="w-full overflow-scroll flex items-center gap-2">
          <Card className="sm:col-span-2 max-w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Create Test</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Create new test for a subject for your class and upload
                marksheet for student
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link
                to="/test/new"
                className={buttonVariants({ variabt: "default:" })}
              >
                Add New Test
              </Link>
            </CardFooter>
          </Card>
        </div>
      </article>
      <br />
      <RecentTests />
    </>
  );
};

export default Dashboard;
