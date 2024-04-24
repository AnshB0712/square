import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useStandards from "../../../hooks/query/useStandards";

const AddStudent = () => {
  const navigate = useNavigate();
  const q = useStandards();
  return (
    <AlertDialog open>
      <AlertDialogContent className="w-[95%] max-w-lg rounded-lg">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-bold">Add Student</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter the student details to add them to the database.
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter student's name" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Enter student's phone number"
                required
                type="tel"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="fees">Fees</Label>
              <Input
                id="fees"
                placeholder="Enter student's fees"
                required
                type="number"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="standard">Standard</Label>
              <Select id="standard" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select standard" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st</SelectItem>
                  <SelectItem value="2">2nd</SelectItem>
                  <SelectItem value="3">3rd</SelectItem>
                  <SelectItem value="4">4th</SelectItem>
                  <SelectItem value="5">5th</SelectItem>
                  <SelectItem value="6">6th</SelectItem>
                  <SelectItem value="7">7th</SelectItem>
                  <SelectItem value="8">8th</SelectItem>
                  <SelectItem value="9">9th</SelectItem>
                  <SelectItem value="10">10th</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Button className="w-full" type="submit">
                Add Student
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddStudent;
