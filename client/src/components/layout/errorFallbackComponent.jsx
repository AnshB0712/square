import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { HomeIcon } from "lucide-react";

export default function ErrorBoundaryComponent({ reset, message }) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full space-y-2">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
          <div className="flex items-center justify-center">
            <TriangleAlertIcon className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-md font-bold text-center">
            Oops, something went wrong with this Component.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            We are sorry, but an unexpected error has occurred.{message ?? ""}
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={reset}>
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Link to="/dashboard" className={buttonVariants()}>
              <HomeIcon className="h-4 w-4 mr-2" />
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function RefreshCwIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function TriangleAlertIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
