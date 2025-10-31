import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

const MyErrorBoundary = ({ children }) => {
  const handleError = (error, info) => {
    console.error("Error caught by ErrorBoundary:", error, info);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};

export default MyErrorBoundary;
