import {
  BadgeIndianRupee,
  BetweenHorizonalStart,
  CircleHelp,
} from "lucide-react";
import UpcomingTests from "./upcomingTests";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import Sparkles from "../../layout/sparkle";
import StudentPerformanceGraph from "./studentPerformanceGraph";

const StudentDashboard = () => {
  return (
    <>
      <article className=" flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <BetweenHorizonalStart className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-sm mb-[2px] font-medium flex items-center md:text-2xl">
            Actions
          </h1>
        </div>
        <div className="w-full">
          <UpcomingTests />
        </div>
      </article>
      <br />
      <br />
      <StudentPerformanceGraph />
      <br />
      <br />
      <article className=" flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <BadgeIndianRupee className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-sm mb-[2px] font-medium flex items-center md:text-2xl">
            Pay Fees
          </h1>
          <Button
            onClick={() =>
              toast("Feature will availiable in near future.", {
                description: `${new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "full",
                  timeStyle: "long",
                  timeZone: "Asia/Kolkata",
                }).format(Date.now())}`,
              })
            }
            size="icon"
            variant="outline"
            className="ml-auto h-7 w-7"
          >
            <CircleHelp className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <div className="w-full my-6 overflow-hidden">
          <Sparkles>
            <Button
              onClick={() =>
                toast("Feature will availiable in near future.", {
                  description: `${new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "full",
                    timeStyle: "long",
                    timeZone: "Asia/Kolkata",
                  }).format(Date.now())}`,
                })
              }
              className="w-full bg-gray-800"
              size="lg"
            >
              Pay Your Fees
            </Button>
          </Sparkles>
        </div>
      </article>
    </>
  );
};

export default StudentDashboard;
