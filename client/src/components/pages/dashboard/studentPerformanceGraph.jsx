import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { BarChart4 } from "lucide-react";

const StudentPerformanceGraph = () => {
  return (
    <>
      <article className=" flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <BarChart4 className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-sm mb-[2px] font-medium flex items-center md:text-2xl">
            Performance Graph
          </h1>
          <Select onValueChange={(e) => console.log(e)}>
            <SelectTrigger className="w-18  ml-auto">
              <SelectValue placeholder="Subjects" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2].map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <p>Performance based Graph</p>
        </div>
      </article>
    </>
  );
};

export default StudentPerformanceGraph;
