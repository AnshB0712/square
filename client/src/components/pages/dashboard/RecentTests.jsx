import { ExternalLink, Layers3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import TestTable from "./TestTable";
import { Link } from "react-router-dom";
import { buttonVariants } from "../../ui/button";

const RecentTests = () => {
  return (
    <div className="flex flex-col gap-2">
      <article className=" flex justify-between gap-2">
        <div className="flex items-center gap-1">
          <Layers3 className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-sm mb-[2px] font-medium flex items-center md:text-2xl">
            Recent Tests in Tuition.
          </h1>
        </div>
        <Link
          className={`${buttonVariants({
            variant: "outline",
            size: "icon",
          })} h-8 w-8`}
          to="/test-table"
        >
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </Link>
      </article>
      <Card>
        <CardContent className="p-2 text-center">
          <TestTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentTests;
