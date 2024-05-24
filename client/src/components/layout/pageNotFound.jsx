import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

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

const PageNotFound = () => {
  return (
    <>
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 py-12 dark:bg-gray-800">
        <div className="flex max-w-md flex-col items-center justify-center text-center">
          <TriangleAlertIcon className="h-12 w-12 text-red-500" />
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Oops, 404 Not Found!
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            We are sorry, but an unexpected error has occurred. Please try again
            later.
          </p>
          <div className="mt-6 flex w-full max-w-xs flex-col gap-2 sm:flex-row">
            <Link
              to="/dashboard"
              className={buttonVariants({ size: "lg" })}
              href="/dashboard"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
