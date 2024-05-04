import React from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minimize2 } from "lucide-react";
import { Loading } from "../../layout/loading";
import { useNavigate } from 'react-router-dom'
import { handleExitFullScreen } from "./RecentTests";

const LazyLoadedTable = React.lazy(() => import("./TestTable"));

const FullscreenTable = () => {
  const navigate = useNavigate()
  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="border-2 rounded-3xl max-w-2xl p-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <CardTitle>X-Square Test Table</CardTitle>
              <CardDescription>
                Take actions on test or edit them as well.
              </CardDescription>
            </div>

            <Button
              className="rounded-full h-7 w-7"
              variant="outline"
              size="icon"
              onClick={() => {
                navigate(-1)
                handleExitFullScreen()
              }}
            >
              <Minimize2 className="h-3 w-3 text-muted-foreground" />
            </Button>
          </CardHeader>
          <CardContent>
            <React.Suspense fallback={<Loading />}>
              <LazyLoadedTable />
            </React.Suspense>
          </CardContent>
        </Card>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FullscreenTable;
