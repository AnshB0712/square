import { Layers3, RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loading } from "../../layout/loading";
import { Badge } from "@/components/ui/badge";
import useTests from "../../../hooks/query/useTests";

const RecentTestTable = () => {
  const { data, isLoading } = useTests();

  const hc = async () => {
    try {
      await document.documentElement.requestFullscreen();
      await screen.orientation.lock("landscape");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <article className=" flex justify-between gap-2">
        <div className="flex items-center gap-1">
          <Layers3 className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-sm mb-[2px] font-medium flex items-center md:text-2xl">
            Recent Tests in Tuition.
          </h1>
        </div>
        <Button onClick={hc} variant="outline" size="icon" className="h-8 w-8">
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
        </Button>
      </article>
      <Card>
        <CardContent className="p-2 text-center">
          {isLoading ? (
            <Loading className="inline-block mx-auto" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    AssignedTo
                  </TableHead>
                  <TableHead>Standard</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Subject
                  </TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.data.map((test) => {
                  return (
                    <TableRow key={test._id}>
                      <TableCell>
                        <div className="font-normal truncate">{test.name}</div>
                      </TableCell>
                      <TableCell className="truncate hidden sm:table-cell">
                        {test.assignedTo.name}
                      </TableCell>
                      <TableCell className="text-xs font-semibold">
                        {`${test.forStandard.class}${
                          test.forStandard.field === "NONE"
                            ? ""
                            : "-" + test.forStandard.field
                        }`}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {test.forSubject.name}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className="text-xs" variant="outline">
                          {new Intl.DateTimeFormat("en-GB", {
                            dateStyle: "medium",
                            timeZone: "Asia/Kolkata",
                          }).format(new Date(test.on))}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentTestTable;
