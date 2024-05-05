import { Layers3, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TestTable from "./TestTable";
import { useNavigate } from "react-router-dom";

const RecentTests = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2">
      <article className=" flex justify-between gap-2">
        <div className="flex items-center gap-1">
          <Layers3 className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-sm mb-[2px] font-medium flex items-center md:text-2xl">
            Recent Tests in Tuition.
          </h1>
        </div>
        <Button
          onClick={() => navigate("/test-table")}
          variant="outline"
          size="icon"
          className="h-8 w-8"
        >
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
        </Button>
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
