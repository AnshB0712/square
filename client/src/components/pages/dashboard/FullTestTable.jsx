import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loading } from "../../layout/loading";

const LazyLoadedTable = React.lazy(() => import("./TestTable"));

const FullTestTable = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between px-2">
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="px-2">X-Square Test Table</CardTitle>
          <CardDescription className="px-2">
            Take actions on test or edit them as well.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-3">
        <React.Suspense fallback={<Loading />}>
          <LazyLoadedTable />
        </React.Suspense>
      </CardContent>
    </Card>
  );
};

export default FullTestTable;
