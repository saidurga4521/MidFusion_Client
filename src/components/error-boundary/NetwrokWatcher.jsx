import { useEffect, useState } from "react";

const NetworkWatcher = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const goOffline = () => setHasError(true);
    const goOnline = () => window.location.reload();

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  if (hasError) {
    throw new Error("No internet connection");
  }

  return children;
};

export default NetworkWatcher;
