import { ListTodo, Newspaper } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import RecentTests from "./RecentTests";
import { Button, buttonVariants } from "../../ui/button";

const TeacherDashboard = () => {
  return (
    <>
      <article className=" flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <ListTodo className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-sm mb-[2px] font-medium flex items-center md:text-2xl">
            Tasks
          </h1>
        </div>
        <div className="w-full overflow-scroll flex items-center gap-2">
          <Card className="sm:col-span-2 max-w-full bg-accent">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-center font-medium">
                Task list is Empty.
              </CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed text-center">
                This section will show all the tasks assigned to you by the
                Admin.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Task Center
              </Button>
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

export default TeacherDashboard;
