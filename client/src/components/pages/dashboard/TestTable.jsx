import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useTests from "../../../hooks/query/useTests";
import { Loading } from "../../layout/loading";
import { useNavigate } from "react-router-dom";
import { handleExitFullScreen } from "./RecentTests";

const TestTable = () => {
  const { data, isLoading } = useTests();
  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">Assigned-To</TableHead>
          <TableHead>Standard</TableHead>
          <TableHead className="hidden sm:table-cell">Subject</TableHead>
          <TableHead className="text-right sm:text-center">Date</TableHead>
          <TableHead className="hidden sm:table-cell text-center">
            Actions
          </TableHead>
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
              <TableCell>
                {`${test.forStandard.class}${
                  test.forStandard.field === "NONE"
                    ? ""
                    : "-" + test.forStandard.field
                }`}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {test.forSubject.name}
              </TableCell>
              <TableCell className="text-right sm:text-center">
                <Badge className="text-xs" variant="outline">
                  {new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "medium",
                    timeZone: "Asia/Kolkata",
                  }).format(new Date(test.on))}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center justify-between">
                <Button
                  className="text-xs underline"
                  style={{ color: "#6E49BF" }}
                  variant="link"
                  size="xs"
                  onClick={() => {
                    handleExitFullScreen();
                    navigate(`/edit/test/${test._id}`);
                  }}
                >
                  Edit
                </Button>
                <span className="inline-block h-[20px] w-[1px] bg-input" />
                <Button
                  className="text-xs underline"
                  style={{ color: "#6E49BF" }}
                  variant="link"
                  size="xs"
                  onClick={() => {
                    handleExitFullScreen();
                    navigate(`/marksheet/test/${test._id}`);
                  }}
                >
                  Marksheet
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TestTable;
