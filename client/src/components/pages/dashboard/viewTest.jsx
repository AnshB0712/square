import React from "react";
import useGetTest from "../../../hooks/query/useGetTest";
import { Link, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Loading } from "../../layout/loading";
import { SelectValue, SelectTrigger, Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { buttonVariants } from "../../ui/button";

const MDX = React.lazy(() => import("./mdx"));

const ViewTest = () => {
  const { testId } = useParams();
  const { data, isLoading } = useGetTest({ testId });

  if (isLoading) return <Loading />;

  return (
    <div className="w-full max-w-lg rounded-lg">
      <div className="mx-auto max-w-md space-y-2 ">
        <div className="text-center">
          <h1 className="text-lg font-bold">Test Details</h1>
        </div>
        <div className="space-y-5">
          <div className="space-y-1">
            <>
              <Label>Name</Label>
              <Input size="lg" value={data.data.data.name} readonly={""} />
            </>
          </div>
          <div className="space-y-1">
            <>
              <Label>Description</Label>
              <React.Suspense fallback={<Loading />}>
                <MDX markdown={data.data.data.description} readOnly={true} />
              </React.Suspense>
            </>
          </div>
          <div className="space-y-1">
            <>
              <Label>Standard</Label>
              <Select>
                <>
                  <SelectTrigger size="lg">
                    <SelectValue placeholder={data.data.data.standard.class} />
                  </SelectTrigger>
                </>
              </Select>
            </>
          </div>
          <div className="space-y-1">
            <>
              <Label>Subject</Label>
              <Select>
                <>
                  <SelectTrigger size="lg">
                    <SelectValue placeholder={data.data.data.subject.name} />
                  </SelectTrigger>
                </>
              </Select>
            </>
          </div>
          <div className="space-y-1">
            <>
              <Label>Date of Test</Label>
              <Button
                variant={"outline"}
                size="lg"
                className="pl-3 text-left text-sm font-normal w-full"
              >
                {format(data.data.data.on, "PPP")}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </>
          </div>

          <Separator />

          <Link
            to="/dashboard"
            className={`${buttonVariants({
              variant: "outline",
              size: "lg",
            })} w-full`}
            size="lg"
          >
            {"Go to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewTest;
