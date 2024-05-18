import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryComponent from "./errorFallbackComponent.jsx";

const Fallback = ({ error, resetErrorBoundary }) => {
  console.log(error);
  return (
    <ErrorBoundaryComponent
      reset={resetErrorBoundary}
      message={error.response?.data?.message}
    />
  );
};

const CustomErrorBoundary = ({ children }) => {
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
};

export default CustomErrorBoundary;
